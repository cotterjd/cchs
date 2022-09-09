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
  <ul v-for="visibleCode in visibleCodes" :key="visibleCode.id" class="left-align list">
    <li class="saved-list">
      <span>{{ visibleCode.unit }}</span>
      <span>{{ visibleCode.codes }}</span>
      <button
        v-if="isUnsaved(visibleCode)"
        @click="onSyncCode(visibleCode)"
        class="small-btn spin"
      >
        <i class="pi pi-sync sync-icon"></i>
      </button>
      <button
        v-else
        @click="onDeleteCode(visibleCode)"
        class="small-btn"
      >
        <i class="pi pi-trash trash-icon"></i>
      </button>
    </li>
    <Divider />
  </ul>
  <Dialog header="Other description" v-model:visible="displayOtherDesc">
    <input-text
      type="text"
      v-model="otherDesc"
      class="full p-inputtest-lg"
    />
  </Dialog>
    <BlockUI :blocked="loading" :full-screen="true" />
    <div v-show="loading" class="center">
      <ProgressSpinner />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import ProgressSpinner from 'primevue/progressspinner'
import BlockUI from 'primevue/blockui'
import { listUnitCodes, saveUnitCodes, deleteUnitCode } from '@/xhr'
import { UnitCode } from '@/types'
import { unserviced, servicedWithIssues, servicedNoIssues } from '@/static/codes'

const logObj = (label: string, data: any) => console.log(JSON.parse(JSON.stringify(data)))

interface CreateResponse {
  success: boolean
  unitCode: UnitCode
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
  visibleCodes: UnitCode[]
  unitName: string
  chosenCodes: string[]
  otherDesc: string
  displayOtherDesc: boolean
  loading: boolean
}
export default defineComponent({
  name: `HomeView`,
  components: {
    InputText,
    Button,
    Dialog,
    Divider,
    ProgressSpinner,
    BlockUI,
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
    visibleCodes: [],
    unitName: ``,
    chosenCodes: [],
    otherDesc: ``,
    displayOtherDesc: false,
    loading: false,
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
      // Only support other desc for one code.
      if (code.toLowerCase().includes(`other`)) {
        this.displayOtherDesc = true
      }
      this.chosenCodes = this.chosenCodes.includes(code)
        ? this.chosenCodes.filter((x: string) => x !== code)
        : [...this.chosenCodes, code]
    },
    onAddCodes() {
      if (!this.storageUser) return alert(`Please add your user.`)
      if (!this.storageJob) return alert(`Please add a job.`)
      if (!this.unitName) return alert(`Please add unit.`)
      this.loading = true
      const codesToSave = this.chosenCodes.map((code: string) => {
        if (code.toLowerCase().includes(`other`)) return `${code} ${this.otherDesc}`
        return code
      })
      this.saveCodes(codesToSave)
    },
    onDeleteCode(savedCode: UnitCode) {
      const yes = window.confirm(`Are you sure you want to delete unit code ${savedCode.unit} ${savedCode.codes}?`)
      if (yes) {
        this.loading = true
        deleteUnitCode(savedCode.id as string).then(this.removeUnitCode)
      }
    },
    onSyncCode(code: UnitCode) {
      this.loading = true
      saveUnitCodes(code)
        .then(this.maybeUpdateStorage)
    },
    maybeUpdateStorage(res: CreateResponse) {
      if (res.success) {
        const unsaved = this.getUnsavedCodes()
        const newCodes = unsaved.filter((x: UnitCode) => x.unit !== res.unitCode.unit)
        localStorage.setItem(this.storageJob, newCodes)
      }
      this.loading = false
    },
    saveCodes(codes: string[]) {
      const codeToSave = {
        user: this.storageUser,
        unit: this.unitName,
        codes: codes.join(`, `),
        property: this.storageJob,
      }
      saveUnitCodes(codeToSave)
        .then(this.addUnitCode)
        .then(this.resetValues)
    },
    async getSavedCodes() {
      const savedCodes = await listUnitCodes(this.storageJob)
      const unsavedCodes = this.getUnsavedCodes()
      const allCodes = [...savedCodes, ...unsavedCodes].sort((a, b) => {
        if (Number.isNaN(Number(a.unit))) {
          if (a.unit - b.unit > 1) return -1
          if (a.unit - b.unit < 1) return 1
          return 0
        }
        if (Number(a.unit) - Number(b.unit) > 1) return -1
        if (Number(a.unit) - Number(b.unit) < 1) return 1
        return 0
      })
      this.savedCodes = savedCodes
      this.visibleCodes = allCodes
    },
    addUnitCode(res: CreateResponse) {
      if (!res.success) {
        const unsavedItems = this.getUnsavedCodes()
        localStorage.setItem(this.storageJob, JSON.stringify([res.unitCode, ...unsavedItems]))
      }
      this.visibleCodes = [res.unitCode, ...this.visibleCodes]
    },
    removeUnitCode(code: UnitCode) {
      this.visibleCodes = this.visibleCodes.filter((x: UnitCode) => x.id !== code.id)
      this.loading = false
    },
    isUnsaved(code: UnitCode) {
      const unsavedCodes = this.getUnsavedCodes()
      return unsavedCodes.some((x: UnitCode) => x.unit === code.unit)
    },
    getUnsavedCodes() {
      return JSON.parse(localStorage.getItem(this.storageJob) || `[]`)
    },
    resetValues() {
      this.unitName = ``
      this.chosenCodes = []
      this.loading = false
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
    grid-gap: 10px;
  }
  .trash-icon {
    display: flex;
    justify-content: end;
    font-size: 25px !important;
    color: red;
  }
  .small-btn {
    background: transparent;
    border: none;
  }
  .center {
    position: absolute;
    top: calc(50vh - 50px);
    left: calc(50vw - 50px);
  }
  .spin {
    animation: refresh-btn-spin infinite 2s linear;
      @keyframes refresh-btn-spin {
        from {
          transform: rotate(360deg);
        }
        to {
          transform: rotate(0deg);
        }
      }
  }
</style>
