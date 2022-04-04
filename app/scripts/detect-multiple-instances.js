/**
 * Sets up two-way communication between the
 * mainline version of extension and Flask build
 * in order to detect & warn if there are two different
 * versions running simultaneously.
 */

import browser from 'webextension-polyfill';
import {
  METAMASK_PROD_BUILD_ID,
  METAMASK_FLASK_BUILD_ID,
} from '../../shared/constants/app';

const MESSAGE_TEXT = 'isRunning';

const showWarning = () =>
  console.warn('Warning! You have multiple instances of MetaMask running!');

/**
 * Handles the ping message sent from other extension.
 *
 * @param message - The message received from the other extension
 */
export const onMessageReceived = (message) => {
  if (message === MESSAGE_TEXT) {
    showWarning();
  }
};

/**
 * Sends the ping message sent to other extension to detect whether it's active or not.
 * Displays console warning if it's active.
 */
export const checkForMultipleVersionsRunning = () => {
  if (browser.runtime.id !== METAMASK_FLASK_BUILD_ID) {
    browser.runtime.sendMessage(METAMASK_FLASK_BUILD_ID, MESSAGE_TEXT);
  }
  if (browser.runtime.id !== METAMASK_PROD_BUILD_ID) {
    browser.runtime.sendMessage(METAMASK_PROD_BUILD_ID, MESSAGE_TEXT);
  }
};
