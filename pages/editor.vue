<template>
  <div class="flex">
    <div v-bind:style="{ height: '100vh', width: '80vw' }" ref="container">
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
              :config="setText({ ...set, text: debugText(set), fill: 'white' })"
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
    <div class="flex flex-col align-center pr-6">
      <div>Title</div>

      <div>
        <div>Components</div>
        <div class="max-h-96 overflow-y-scroll">
          <Panel
            v-for="panel in panelsDb"
            :src="panel.path"
            :key="panel.filename"
          ></Panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import panelsDb from '~/static/panellist.json'

import Konva from 'konva'
import { Imageset } from '~/static/images/editor/atlas.json'
const width = window.innerWidth
const height = window.innerHeight
var sceneWidth = 1000
var sceneHeight = 1000
export default {
  data() {
    return {
      panelsDb,
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
        x: Number(config._XPos) + 10,
        y: Number(config._YPos) + 20,
      }
    },

    debugText(set) {
      return `${set._Name} - ${set._Width} x ${set._Height} pixels`
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

    setImage() {
      console.log('set')

      const image = new window.Image()
      image.src = `images/${this.replaceWith}.PNG`
      image.onload = () => {
        // set image only when it is loaded
        this.entities = image
      }
    },
  },
}
</script>
