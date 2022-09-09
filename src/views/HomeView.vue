<template>
  <div v-if="!storageUser">
    <input-text
      v-model="inputUser"
      type="text"
      class="full p-inputtext-lg"
      placeholder="User name"
    />
    <Button
      @click="onSaveUser"
      label="Save User Name"
      class="full p-button-lg"
    />
    <br />
    <br />
  </div>
  <div v-if="!storageJob">
    <input-text
      v-model="inputJob"
      type="text"
      class="full p-inputtext-lg"
      placeholder="Property name"
    />
    <Button
      @click="onSaveJob"
      label="Start New Property"
      class="full p-button-lg"
    />
    <br />
    <br />
  </div>

  <input-text
    v-model="unitName"
    type="text"
    class="full p-inputtext-lg"
    placeholder="Unit"
  />
  <br />
  <br />
  <div v-for="code in greenCodes" :key="code">
    <Button
      @click="onAddCode(code)"
      :label="code"
      class="full p-button-lg"
      :class="chosenCodes.includes(code) ? 'p-button-secondary' : ''"
    />
    <br />
    <br />
  </div>
  <div v-for="code in yellowCodes" :key="code">
    <Button
      @click="onAddCode(code)"
      :label="code"
      class="full p-button-lg"
      :class="chosenCodes.includes(code) ? 'p-button-secondary' : 'p-button-warning'"
    />
    <br />
    <br />
  </div>
  <div v-for="code in redCodes" :key="code">
    <Button
      @click="onAddCode(code)"
      :label="code"
      class="full p-button-lg"
      :class="chosenCodes.includes(code) ? 'p-button-secondary' : 'p-button-danger'"
    />
    <br />
    <br />
  </div>
  <Button
    @click="onAddCodes"
    label="Add Codes"
    class="full p-button-lg p-button-success"
  />
  <br />
  <br />
  <Button
    @click="onEndJob"
    label="End Job"
    class="full p-button-lg p-button-help"
  />
  <h2>Completed Units</h2>
  <ul v-for="savedCode in savedCodes" :key="savedCode.id" class="left-align list">
    <li class="saved-list">
      <span>{{ savedCode.unit }}</span>
      <span>{{ savedCode.codes }}</span>
      <button
        @click="onDeleteCode(savedCode)"
        class="del-btn"
      >
        <i class="pi pi-trash trash-icon"></i>
      </button>
    </li>
    <Divider />
  </ul>
  <Dialog header="Other description" v-model:visible="display">
    <input-text
      type="text"
      v-model="otherDesc"
      class="full p-inputtest-lg"
    />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import { listUnitCodes, saveUnitCodes, deleteUnitCode } from '@/xhr'
import { unserviced, servicedWithIssues, servicedNoIssues } from '@/static/codes'

const logObj = (label: string, data: any) => console.log(JSON.parse(JSON.stringify(data)))

interface UnitCode {
  id: string
  unit: string
  codes: string
  property: string
  user: string
}
interface Data {
  greenCodes: string[]
  yellowCodes: string[]
  redCodes: string[]
  inputUser: string
  inputJob: string
  storageUser: string
  storageJob: string
  savedCodes: UnitCode[]
  unitName: string
  chosenCodes: string[]
  otherDesc: string
  display: boolean
}
export default defineComponent({
  name: `HomeView`,
  components: {
    InputText,
    Button,
    Dialog,
    Divider,
  },
  data: (): Data => ({
    greenCodes: [],
    yellowCodes: [],
    redCodes: [],
    inputUser: ``,
    inputJob: ``,
    storageUser: ``,
    storageJob: ``,
    savedCodes: [],
    unitName: ``,
    chosenCodes: [],
    otherDesc: ``,
    display: false,
  }),
  async mounted() {
    this.greenCodes = servicedNoIssues
    this.yellowCodes = servicedWithIssues
    this.redCodes = unserviced
    this.storageUser = localStorage.getItem(`user`) || ``
    this.storageJob = localStorage.getItem(`job`) || ``
  },
  watch: {
    async storageJob() {
      this.getSavedCodes()
    },
  },
  methods: {
    onSaveUser() {
      localStorage.setItem(`user`, this.inputUser)
      this.storageUser = localStorage.getItem(`user`) || ``
    },
    onSaveJob() {
      localStorage.setItem(`job`, this.inputJob)
      this.storageJob = localStorage.getItem(`job`) || ``
    },
    onEndJob() {
      localStorage.setItem(`job`, ``)
      this.inputJob = ``
      this.storageJob = ``
    },
    onAddCode(code: string) {
      // Only suppport other desc for one code.
      if (code.toLowerCase().includes(`other`)) {
        this.display = true
      }
      this.chosenCodes = this.chosenCodes.includes(code)
        ? this.chosenCodes.filter((x: string) => x !== code)
        : [...this.chosenCodes, code]
    },
    onAddCodes() {
      if (!this.storageUser) return alert(`Please add your user.`)
      if (!this.storageJob) return alert(`Please add a job.`)
      if (!this.unitName) return alert(`Please add unit.`)
      const codesToSave = this.chosenCodes.map((code: string) => {
        if (code.toLowerCase().includes(`other`)) return `${code} ${this.otherDesc}`
        return code
      })
      this.saveCodes(codesToSave)
    },
    onDeleteCode(savedCode: UnitCode) {
      const yes = window.confirm(`Are you sure you want to delete unit code ${savedCode.unit} ${savedCode.codes}?`)
      if (yes) {
        deleteUnitCode(savedCode.id).then(this.getSavedCodes)
      }
    },
    saveCodes(codes: string[]) {
      saveUnitCodes(this.storageUser, this.unitName, codes, this.storageJob)
        .then(this.getSavedCodes)
        .then(this.resetValues)
    },
    async getSavedCodes() {
      this.savedCodes = await listUnitCodes(this.storageJob)
    },
    resetValues() {
      this.unitName = ``
      this.chosenCodes = []
    },
  },
})
</script>
<style>
  .full {
    width: 100%;
  }
  .left-align {
    text-align: left;
  }
  .list {
    list-style: none;
    padding-left: 0;
  }
  .saved-list {
    display: grid;
    grid-template-columns: 50px 4fr 30px;
    font-size: 22px;
  }
  .trash-icon {
    display: flex;
    justify-content: end;
    font-size: 25px !important;
    color: red;
  }
  .del-btn {
    background: transparent;
    border: none;
  }
</style>
