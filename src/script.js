import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'react-app-polyfill/ie11'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'

import { getChannelPreferences } from 'actions/channel'
import App from 'containers/App'

const idChatDiv = 'cai-webchat-div'

if (!document.getElementById(idChatDiv)) {
  const element = document.createElement('div')
  element.id = idChatDiv
  document.body.appendChild(element)
}

const root = document.getElementById(idChatDiv)

const script = document.currentScript || document.getElementById('cai-webchat')

const channelId = script.getAttribute('channelId')
const token = script.getAttribute('token')

const readOnly = false

// Added May 2021. Moved rendering of chat inside dedicated function (window.renderChat) to 
// enable dynamic overwrite of preferences (via window.webchatPreferences)
window.renderChat = (preferences) => {
  window.webchatPreferences = preferences
  ReactDOM.render(
    <Provider store={store}>
      <App
        token={token}
        channelId={channelId}
        preferences={preferences}
        readOnlyMode={readOnly} />
    </Provider>,
    root,
  )
}

if (root && channelId && token) {
  getChannelPreferences(channelId, token).then(preferences => {
    renderChat(preferences)
  })
}
