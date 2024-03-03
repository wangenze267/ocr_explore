<template>
  <div>
    <d-upload ref="demoUpload" v-model="uploadedFiles" :on-change="getfile" :auto-upload="false"/>
    <d-button @click="submit" style="margin-top: 20px">手动上传</d-button>
    <d-button @click="clear" style="margin: 20px 0px 0px 10px;">清空文件</d-button>
    <!-- <d-button @click="token" style="margin: 20px 0px 0px 10px;">获取token</d-button> -->
  </div>
  <div class="content">
    <div class="img">
      <img :src="img.url" alt="image">
    </div>
    <div class="ocr">
      <div class="ocrContent" @mouseup="slect">
        <div v-for="(item, index) in ocr.arr" :key="index" :style="returnStyle(item.location)">
          <span v-for="str in item.words">{{str}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { defineComponent, onMounted, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    // token
    const access_token = ''

    const uploadedFiles = ref([]);
    const demoUpload = ref(null);
    const img = reactive({
      url: ''
    })
    const ocr = reactive({
      arr: []
    })
    const submit = () => {
      demoUpload.value.submit();
    };
    const clear = () => {
      demoUpload.value.clearFiles();
    };
    const upload = (files) => {

    }
    const data = qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': '', // AK
      'client_secret': '' // SK
    });
    const token =  async () => {
      const res =  await axios.post(`/api/oauth/2.0/token`, data)
      console.log(res)
    }
    // 百度要求 img 要转 base64
    const getBase64 = (file) => {
      return new Promise( (resolve, reject) => {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = () => {
          imgResult = reader.result;
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.onloadend = () => {
          resolve(imgResult);
        };
      });
    }
    const getfile = async (file) => {
      console.log(file)
      token()
      const base64 = await getBase64(file[0])
      img.url = base64
      toBaidu(base64)
    }
    const toBaidu = async (img) => {
      const res = await axios.post(`/api/rest/2.0/ocr/v1/general?access_token=${access_token}`,{image:img},
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

      })
      console.log(res)
      if(res.data) {
        ocr.arr = res.data.words_result
      }
    }
    const returnStyle = (location) => {

      return {
        'top': location.top + 'px' ,
        'width': location.width + 'px' ,
        'left': location.left + 'px' ,
        'height': location.height + 'px' ,
        'position': 'absolute'
      }
    }
    const slect = () => {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const allWithinRangeParent = range.commonAncestorContainer.getElementsByTagName("*");

      const allSelected = [];
      for (let i=0, el; el = allWithinRangeParent[i]; i++) {
        if (selection.containsNode(el, true) ) {
          allSelected.push(el);
        }
      }
      console.log('left:', allSelected?.[0].offsetLeft)
      console.log('top:', allSelected?.[0].offsetTop)
    }
    return {
      uploadedFiles,
      demoUpload,
      submit,
      clear,
      getfile,
      img,
      ocr,
      returnStyle,
      slect
    };
  },
});

</script>

<style>
.content{
  display: flex;
  width: 1000px;
  height: 600px;
  justify-content: space-around;
}
.content div {
  width: 450px;
  height: 600px;
}
.ocrContent{
  position: relative;
}
.ocrContent div {
  display: flex;
}
</style>