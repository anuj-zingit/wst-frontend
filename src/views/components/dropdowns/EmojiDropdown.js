import React, { Component } from "react";
import { Link } from "react-router-dom";
import ConversationSearchInput from "../inputs/ConversationSearchInput";
// import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
class EmojiDropdown extends Component {
  onEmojiClick = (event, emojiObject) => {
    this.props.onSelectEmoji(emojiObject);
  };
  render() {
    return (
      <>
        {/* <Picker
          onEmojiClick={this.onEmojiClick}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_MEDIUM_DARK}
          groupNames={{ smileys_people: "PEOPLE" }}
        /> */}
        <Picker sheetSize={64} enableFrequentEmojiSort={false} title={null} onSelect={emoji =>  this.props.onSelectEmoji(emoji.native)} />
      </>
    );
  }
}

export default EmojiDropdown;
