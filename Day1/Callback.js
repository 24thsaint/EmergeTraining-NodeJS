var channelWizardSpell = function(spellEffect) {
    console.log("Channelling spell...")
    console.log("Casting spell...")
    spellEffect()
}

var channellingEffect  = function() {
    console.log("Warning: WIZARD MANA HAS BECOME EMPTY!")
}

channelWizardSpell(channellingEffect)
