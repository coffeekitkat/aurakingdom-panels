<template>
  <div v-bind:style="{ height: '100vh', width: '100vw' }" ref="container">
     <button @click="setImage">set</button>
    <v-stage ref="stage" :config="stageConf">
    
      <v-layer ref="layer">
        <v-image
          :config="{
            image: image,
          }"
        />
      </v-layer>

      <v-layer ref="layer1">
        <v-group v-for="set in Imageset.Image" :key="set._Name">
          <v-rect :config="loadImageSet(set)" />
          <v-text
            :config="setText({ ...set, text: set._Name, fill: 'white' })"
          ></v-text>
        </v-group>
      </v-layer>
          <v-layer ref="layer3">
        <v-image
          :config="{
            image: entities,
          }"
        />
      </v-layer>
    </v-stage>
   
  </div>
</template>

<script>
import Konva from 'konva'
import { Imageset } from '~/static/images/editor/atlas.json'
const width = window.innerWidth
const height = window.innerHeight
var sceneWidth = 1000
var sceneHeight = 1000
export default {
  data() {
    return {
      stageConf: {
        width: width,
        height: height,
      },
      image: null,
      xmlDoc: {},
      Imageset,
      replaceWith: 'panel0191',
      entities: null,
    }
  },
  created() {
    window.addEventListener('resize', this.changeRect)
    this.changeRect()

    const image = new window.Image()
    image.src = 'images/editor/main10_base.png'
    image.onload = () => {
      // set image only when it is loaded
      this.image = image
    }

  },

  methods: {
    loadImageSet(set) {
      return {
        x: Number(set._XPos),
        y: Number(set._YPos),
        width: Number(set._Width),
        height: Number(set._Height),
        stroke: 'green',
      }
    },

    setText(config) {
      return {
        ...config,
        x: Number(config._XPos),
        y: Number(config._YPos),
      }
    },

    changeRect() {
      const container = this.$refs.container

      if (!container) {
        return
      }

      const height = container.offsetHeight
      const width = container.offsetWidth

      this.stageConf.width = width
      this.stageConf.height = height
    },

    setImage(){
        console.log('set')
      
   
        const image = new window.Image()
        image.src = `images/${this.replaceWith}.PNG`
        image.onload = () => {
        // set image only when it is loaded
        this.entities = image
        }
    }
  },
}
</script>
