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
    <spacer-break />
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
    <spacer-break />
  </div>

  <input-text
    v-model="unitName"
    type="text"
    class="full p-inputtext-lg"
    placeholder="Unit"
  />
  <spacer-break />
  <div v-for="code in greenCodes" :key="code">
    <Button
      @click="onAddCode(code)"
      :label="code"
      class="full p-button-lg"
      :class="chosenCodes.includes(code) ? 'p-button-secondary' : ''"
    />
  <spacer-break />
  </div>
  <Button
    @click="onAddCodes"
    label="Add Codes"
    class="full p-button-lg p-button-success"
  />
  <spacer-break />
  <div v-for="code in yellowCodes" :key="code">
    <Button
      @click="onAddCode(code)"
      :label="code"
      class="full p-button-lg"
      :class="chosenCodes.includes(code) ? 'p-button-secondary' : 'p-button-warning'"
    />
    <spacer-break />
  </div>
  <div v-for="code in redCodes" :key="code">
    <Button
      @click="onAddCode(code)"
      :label="code"
      class="full p-button-lg"
      :class="chosenCodes.includes(code) ? 'p-button-secondary' : 'p-button-danger'"
    />
    <spacer-break />
  </div>
  <Button
    @click="onEndJob"
    label="End Job"
    class="full p-button-lg p-button-help"
  />
  <div class="units-header">
    <h2>Completed Units</h2>
    <span>
      Offline Mode
      <checkbox class="offline-checkbox" v-model="offlineMode" :binary="true" />
    </span>
  </div>
  <ul v-for="visibleCode in visibleCodes" :key="visibleCode.id" class="left-align list">
    <li class="saved-list">
      <span>{{ visibleCode.unit }}</span>
      <span>{{ visibleCode.codes }}</span>
      <ProgressSpinner
        v-if="!visibleCode.id && saving === visibleCode.unit"
        style="height: 25px; width: 25px; margin-right: 5px;"
      />
      <button
        v-else-if="!visibleCode.id"
        @click="onSyncCode(visibleCode)"
        :class="`small-btn ${syncing === visibleCode.unit ? 'spin' : ''}`"
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
    <spacer-break />
    <Button
      @click="displayOtherDesc = false"
      label="Save"
      class="full p-button-lg"
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
import Checkbox from 'primevue/checkbox'
import { listUnitCodes, saveUnitCodes, deleteUnitCode } from '@/xhr'
import { UnitCode } from '@/types'
import * as R from 'ramda'
import SpacerBreak from '@/components/SpacerBreak.vue'
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
  syncing: string
  loading: boolean
  saving: string
  offlineMode: boolean
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
    SpacerBreak,
    Checkbox,
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
    syncing: ``,
    loading: false,
    saving: ``,
    offlineMode: false,
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
      this.loading = true
      this.visibleCodes = this.getStorageCodes()
      this.getSavedCodes()
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
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
      if (code.toLowerCase().includes(`other`) && !this.chosenCodes.includes(code)) {
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
      if (this.chosenCodes.length === 1 && this.chosenCodes[0] === `Went Back`) return alert(`Must choose another code with 'Went Back'`)
      const codesToSave = this.chosenCodes.map((code: string) => {
        if (code.toLowerCase().includes(`other`)) return `${code} ${this.otherDesc}`
        return code
      })
      this.saveCodes(codesToSave)
    },
    onDeleteCode(savedCode: UnitCode) {
      const yes = window.confirm(`Are you sure you want to delete unit code ${savedCode.unit} ${savedCode.codes}?`)
      if (yes) {
        if (this.offlineMode) {
          this.removeUnitCode(savedCode)
        } else {
          deleteUnitCode(savedCode.id as string).then(this.removeUnitCode)
        }
      }
    },
    onSyncCode(code: UnitCode) {
      if (this.offlineMode) return alert(`Cannot sync in offline mode.`)
      this.syncing = code.unit
      const cb = (_: void | CreateResponse) => this.syncing = ``
      saveUnitCodes(code)
        .then(cb)
        .then(this.getSavedCodes)
        .catch(cb)
    },
    saveCodes(codes: string[]) {
      const codeToSave = {
        user: this.storageUser,
        unit: this.unitName,
        codes: codes.join(`, `),
        property: this.storageJob,
      }
      this.addCodeToUI(codeToSave)
      if (!this.offlineMode) {
        this.saving = this.unitName
        saveUnitCodes(codeToSave)
          .then(this.getSavedCodes)
          .then(this.resetValues)
          .catch(this.resetValues)
      }
    },
    addCodeToUI(unitCode: UnitCode) {
      const unsavedItems = this.getStorageCodes()
      localStorage.setItem(this.storageJob, JSON.stringify([unitCode, ...unsavedItems]))
      this.visibleCodes = [unitCode, ...this.visibleCodes]
    },
    async getSavedCodes() {
      const savedCodes = this.offlineMode ? [] : await listUnitCodes(this.storageJob)
      const unsavedCodes = this.getStorageCodes()
      const allCodes = R.pipe(
        (codes: UnitCode[]) => codes.sort((a: UnitCode, b: UnitCode) => {
          if (!a.createdAt || !b.createdAt) return 0
          const aDate = (new Date(a.createdAt)).getTime()
          const bDate = (new Date(b.createdAt)).getTime()
          if (aDate - bDate > 1) return -1
          if (aDate - bDate < 1) return 1
          return 0
        }),
        (codes: UnitCode[]) => R.groupBy(R.prop(`unit`), codes),
        (codeObj: Record<string, UnitCode[]>) => Object.keys(codeObj).map((key: string) => {
          const dups = codeObj[key]
          return dups.find((x: UnitCode) => x.id) || R.head(dups) as UnitCode
        }),
        (codes: UnitCode[]) => R.uniqBy(R.prop(`unit`), codes),
      )([...unsavedCodes, ...savedCodes])
      this.savedCodes = savedCodes
      this.visibleCodes = allCodes
    },
    removeUnitCode(code: UnitCode) {
      this.visibleCodes = this.visibleCodes.filter((x: UnitCode) => x.id !== code.id)
      this.syncing = ``
    },
    isUnsaved(code: UnitCode) {
      const unsavedCodes = this.getStorageCodes()
      return unsavedCodes.some((x: UnitCode) => x.unit === code.unit)
    },
    getStorageCodes() {
      return JSON.parse(localStorage.getItem(this.storageJob) || `[]`)
    },
    resetValues() {
      this.unitName = ``
      this.chosenCodes = []
      this.syncing = ``
      this.saving = ``
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
    position: fixed;
    top: calc(50vh - 50px);
    left: calc(50vw - 50px);
  }
  .spin {
    animation: refresh-btn-spin infinite 2s linear;
  }
  .units-header {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
  }
  .offline-checkbox {
    margin-top: 20px;
  }
  @keyframes refresh-btn-spin {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
</style>
