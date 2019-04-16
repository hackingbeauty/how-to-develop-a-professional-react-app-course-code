import localforage from 'localforage'

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'VoiceRecordPro',
  storeName: 'VoiceRecordDataPro'
})

export function storeRecording({ id, recording }, callback) {
  localforage.setItem(id, recording)
    .then(() => {
      if (callback) { callback() }
    })
}

export function getStoredRecording(id) {
  return localforage.getItem(id)
    .then(value => value)
}

export function getAllStoredRecordings() {
  const storedItems = []

  return localforage.iterate((recording) => {
    storedItems.push(recording)
  }).then(() => storedItems)
}

export function deleteStoredRecording(id, successCallback) {
  localforage.removeItem(id, successCallback)
}
