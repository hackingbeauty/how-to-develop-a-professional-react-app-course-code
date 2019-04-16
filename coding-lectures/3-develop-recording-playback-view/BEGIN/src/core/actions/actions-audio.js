import types              from 'core/types'
import { storeRecording } from 'core/libs/lib-cache'

export function startRecording() {
  return {
    type: types.START_RECORDING
  }
}

export function allowMicrophoneAccess() {
  return {
    type: types.MICROPHONE_ACCESS_GRANTED
  }
}

export function stopRecording(saveRecording) {
  return {
    type: types.STOP_RECORDING,
    saveRecording
  }
}

function saveDispatch(recording) {
  return {
    type: types.SAVE_RECORDING,
    recording
  }
}

export function save({ id, recording }, callback) {
  return (dispatch, getState) => {
    const { count } = getState().audio
    const title = `Untitled #${count + 1}`
    const enhancedRecording = Object.assign({ id }, { title }, recording)

    storeRecording({ id, recording: enhancedRecording }, () => {
      dispatch(saveDispatch(enhancedRecording))

      if (callback) { callback() }
    })
  }
}
