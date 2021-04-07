let scenery = JSON.parse(`
    {
    "alphabet":["a","b"],
    "words":["aba","baa","ada","ababababaaaaaabbbbaaabbbbaabbb","ababababaaaaaabbbbaaabbbbaabbbc"],
    "automata":{
        "type":"d",
        "initialStatePosition":0,
        "states":[
            {
                "final":false,
                "description":"q0",
                "transitions":[
                    {
                        "input":["a"],
                        "positionNextState":1
                    }
                ]
            },
            {
                "final":true,
                "description":"q1",
                "transitions":[
                    {
                        "input":["a"],
                        "positionNextState":1
                    },
                    {
                        "input":["b"],
                        "positionNextState":1
                    }
                ]
            }
        ]
    }
}
`)

function test(automata,word) {
    
    let statePosition = automata.initialStatePosition
    let states = automata.states
    
    for (let letter of word) {
        
        statePosition = states[statePosition].transitions.reduce((accumulated,transition) => {
            
            if (transition.input == letter) {
                accumulated = transition.positionNextState
            }
            return accumulated
        }, -1)
        
        if(statePosition === -1){
               return false 
        }
    }

    if (states[statePosition].final) {
        return true
    } else {
        return false
    }
}

function transformation(automaton,alphabet) {
    return null;// retorna um autômato determinístico que foi gerado da conversão do não determinístico que recebeu 
}

function printAutomata(automata) {
    let statePosition = automata.initialStatePosition
    let states = automata.states
    console.log(`O estado inicial é ->${states[statePosition].description}`)
    states.forEach(state => {
        console.log(`O estado ${state.description} com entrada X se liga ao estado: Y`)
        state.transitions.forEach(transition => {
            console.log(`${transition.input} --> ${states[transition.positionNextState].description}`)
        })
    })
    console.log('\n')
    
}

function setScenery(scenery) {
    
    if (scenery.automata.type == 'n') {
        
        scenery.automata = transformation(scenery.automata,scenery.alphabet)
        printAutomata(scenery.automata)
    }
    
    scenery.words.forEach( word => {
        console.log(`A palavra ${word} ${test(scenery.automata, word)?'':'não'} pertence a linguagem definida por esse autômato`);
    })
}

setScenery(scenery)