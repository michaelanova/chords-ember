import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Promise as EmberPromise } from 'rsvp';
import { htmlSafe } from '@ember/string';
import { later } from '@ember/runloop';
import { debug } from '@ember/debug';
import ENV from '../../config/environment';
import $ from 'jquery';

export default Component.extend({
	//currentUser: service(),
  //i18n: service(),
  //toastMessage: service(),
  //cordova: service(),
  classNames: ['media-upload'],
  classNameBindings: ['media.url:selected'],
  media: null,
  accept: 'image/*,video/*',
  maxSize: null, // kilobytes
  duration: 60, // seconds
  publicId: null,
  deleteToken: null,
  required: true,
  progress: 0,
  progressStyle: computed('progress', function() {
    return htmlSafe(`width: ${this.progress}%;`);
  }),
  error: '',
  init() {
    this._super(...arguments);
    this.set('maxSize', { image: '10000', video: '40000' });
  },
  willDestroyElement() {
    if (!this.get('media.url') && this.deleteToken) {
      this.send('remove');
    }
  },
  _upload(file, type) {
    let $submit = this.$().closest('form').find(':submit');
    $submit.addClass('disabled');

    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', ENV.cloudinary.uploadPreset[type]);

    $.ajax({
      xhr: () => {
        let xhr = new window.XMLHttpRequest();

        xhr.upload.addEventListener('progress', event => {
          if (event.lengthComputable) {
            this.set('progress', Math.round(event.loaded / event.total * 100));
          }
        }, false);

        return xhr;
      },
      url: ENV.cloudinary.url + '/upload',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
      success: result => {
        this.media.setProperties({
          url: result.secure_url, type: result.resource_type
        });
        this.setProperties({
          publicId: result.public_id, deleteToken: result.delete_token
        });
        this.set('progress', 0);
        $submit.removeClass('disabled');
      },
      error: () => {
        this.set('progress', 0);
        $submit.removeClass('disabled');
        console.log('media uload error');
      }
    });
  },
  _fileUpload(fileData, type='video', offset = 50) {
    const $submit = this.$().closest('form').find(':submit');
    const fileURL = fileData.fullPath;
    const success = r => {
      const result = JSON.parse(r.response);
      this.media.setProperties({
        url: result.secure_url, type: result.resource_type
      });
      this.setProperties({
        publicId: result.public_id, deleteToken: result.delete_token
      });
      this.set('progress', 0);
      $submit.removeClass('disabled');
    };

    const fail = error => {
      this.set('progress', 0);
      $submit.removeClass('disabled');
      console.log('media uload error');
      debug(error);
    };

    const uri = encodeURI(ENV.cloudinary.url + '/upload');
    const options = new window.FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
    options.params = {upload_preset: ENV.cloudinary.uploadPreset[type]};
    options.mimeType = fileData.type;

    const ft = new window.FileTransfer();
    ft.onprogress = progressEvent => {
      if (progressEvent.lengthComputable) {
        this.set('progress', Math.round(((progressEvent.loaded / progressEvent.total) * 100) / (offset ? 2 : 1) + offset));
      } else {
        this.incrementProperty('progress');
      }
    };
    ft.upload(fileURL, uri, success, fail, options);
  },
  _transcodeVideo(fileData) {
    return new EmberPromise((resolve, reject) => {
      // parameters passed to transcodeVideo
      window.VideoEditor.transcodeVideo(
        data => {
          fileData.fullPath = 'file://'+data;
          resolve(fileData);
        }, e => {
          reject(e);
        }, {
          fileUri: fileData.fullPath,
          outputFileName: `video-${new Date().toISOString()}`,
          outputFileType: window.VideoEditorOptions.OutputFileType.MPEG4,
          optimizeForNetworkUse: window.VideoEditorOptions.OptimizeForNetworkUse.YES,
          saveToLibrary: false,
          maintainAspectRatio: true,
          width: 1366,
          height: 1366,
          videoBitrate: 2500000, // 2.5 megabit
          audioChannels: 2,
          audioSampleRate: 44100,
          audioBitrate: 128000, // 128 kilobits
          progress: info => {
            this.set('progress', Math.round((info * 100)/2));
          }
        }
      );
    });
  },
  actions: {
    remove() {
      $.ajax({
        url: ENV.cloudinary.url + '/delete_by_token',
        method: 'POST',
        data: {
          public_id: this.publicId, token: this.deleteToken
        },
        error: () => {
          console.log('media remove error');
        },
        complete: () => {
          this.media.setProperties({ url: null, type: null });
          this.setProperties({ publicId: null, deleteToken: null });
        }
      });
    },
    captureVideo() {
      navigator.device.capture.captureVideo(data => {
        const file = data[0];
        later(() => {   // je potreba pockat na soubor
          this.$().closest('form').find(':submit').addClass('disabled');
          if (file.size > 20000000) { // 20MB
            this._transcodeVideo(file).then(fileData => {
              this._fileUpload(fileData, 'video');
            }, e => {
              debug(e);
              this.set('progress', 0);
              const maxSize = this.maxSize['video'];
              if (file.size > maxSize) {
                this.set('error',`maximalni velikost je 20MB`);
              } else {
                this._fileUpload(file, 'video', 0);
              }
            });
          } else {
            this._fileUpload(file, 'video', 0);
          }
        }, 300);
      }, e => {
        debug(e);
        console.log('media remove error');
      }, {duration: this.duration, quality: 1, ios_quality: 'high'});
    },
    captureImage() {
      navigator.device.capture.captureImage(data => {
        this._fileUpload(data[0], 'image');
      }, e => {
        debug(e);
        console.log('media remove error');
      });
    },
    fileChange(event) {
      this.set('error', '');

      let file = event.target.files[0],
          type = file.type.split('/').shift(),
          maxSize = this.maxSize[type];

      if (file && file.size / 1000 > maxSize) {
        this.set('error', 'překročena velikost');
        event.target.value = '';
        return;
      }

      if (type === 'image') {
        this._upload(file, type);
      } else if (type === 'video') {
        let _this = this,
            duration = this.duration,
            video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function() {
          window.URL.revokeObjectURL(this.src);
          if (video.duration > duration) {
            _this.set('error','moc dlouhé video');
            event.target.value = '';
          } else {
            _this._upload(file, type);
          }
        };
        video.src = window.URL.createObjectURL(file);
      } else {
        this.set('error', 'špatný formát');
        event.target.value = '';
      }
    }
  }
});
