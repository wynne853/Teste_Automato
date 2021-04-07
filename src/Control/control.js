let scenery = JSON.parse(`
   {
    "alphabet":["a","b"],
    "words":["aba","baa","cda"],
    "automata":{
        "type":"n",
        "initialStatePosition":0,
        "states":[
            {
                "final":false,
                "description":"q0",
                "transitions":[
                    {
                        "input":["a"],
                        "positionNextState":0
                    },
                    {
                        "input":["b"],
                        "positionNextState":0
                    },
                    {
                        "input":["b"],
                        "positionNextState":1
                    }
                ]
            },
            {
                "final":true,
                "description":"q1",
                "transitions":[
                    
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

function compareTableStates(state_1,state_2) {
    
    for (let element_1 of state_1) {
        let search = state_2.reduce((accumulated, element_2) => {
          return !accumulated && element_1 !== element_2 ? accumulated :true 
        }, false)
        if (!search)
            return false
    }

    return true
}

function transformation(automata, alphabet) {
    let table = [['-', ...alphabet]]
    let statePosition = automata.initialStatePosition
    let states = automata.states
    let tableRow = 1
    table.push([[statePosition]])
  
    do {
        //preencher tabela
        table[tableRow][0].forEach( stateElement => {
            let stateTable = states[stateElement];
            
            stateTable.transitions.forEach((transition) => {
                for (let index in table[0]) {
                    let letter = table[0][index]
                    if (letter !== '-' && transition.input == letter) {
                        if (table[tableRow][index]) {
                            table[tableRow][index].push(transition.positionNextState)
                        } else {
                            table[tableRow][index] = [transition.positionNextState]
                        }
                    }
                }
        
            })
            
        })
        // procurar elementos novos
        for (let i = 1; i < table[tableRow].length;i++){
            for (let j = 1; j < table.length; i++){
                if (!table[tableRow][i] || !table[j][0] || compareTableStates(table[tableRow][i],table[j][0])) {
                    break;
                } else if( (j + 1) === table.length) {
                    table.push([table[tableRow][i]])
                }
            }
        }

        tableRow++
    }while (tableRow !== table.length)
    //criação do novo autômato
    for (let row = 1; i < table.length; row++){
        
        table[row].forEach((element,index) => {
            
        })
    }

    table.forEach(row => {
        console.log(row.reduce((accumulated, element) => {
            return accumulated + element + " | "
        }," | "))
        console.log('\n')
    })

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
        //printAutomata(scenery.automata)
    }
    
    /*scenery.words.forEach( word => {
        console.log(`A palavra ${word} ${test(scenery.automata, word)?'':'não'} pertence a linguagem definida por esse autômato`);
    })*/
}

setScenery(scenery)