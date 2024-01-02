class TextToSpeech {
  enabled: boolean = false
  utterance!: SpeechSynthesisUtterance

  constructor(language: string) {
    this.enabled = "speechSynthesis" in window
    if (this.enabled) {
      this.utterance = new SpeechSynthesisUtterance()
      this.utterance.lang = language
    }
  }

  say(text: string) {
    if (!this.enabled) return

    this.utterance.text = text
    window.speechSynthesis.speak(this.utterance)
  }
}

export const textToSpeech = new TextToSpeech("fr-FR")
