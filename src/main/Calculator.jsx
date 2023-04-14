import React , {Component} from 'react'

import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
        displayValue: '0',
        clearDisplay: false,
        operation: null , 
        values: [0,0], // limpar o display 
        current: 0          // manipular o indicie se o valor 1 ou 0 

}
export default class Calculator extends Component {

    state = {...initialState}

        clearMemory(){
            this.setState({...initialState})
        }
        


        setOperation(operation){
            if(this.state.current === 0 ){  // para o display ser limpo

                this.setState({operation, current: 1 , clearDisplay: true}) // ele espera clicar em outro operador para fazer a soma
            }
            else {
                const equals = operation === "="
                const currentOperation = this.state.operation                     //para o usuario somar mais de uma vez colocando o operador + 
          
        
                const values = [...this.state.values]
                try{
                values[0] = eval(`${values [0]}   ${currentOperation}   ${values[1]}`) // vai executar é armazenar a função no zero
                
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                return
                }
                }catch(e){
                    values[0] = this.state.values[0]

                }

                values [1] = 0
                this.setState({
                     displayValue: values[0],
                     operation: equals ? null : operation,
                     current:equals ? 0 : 1 , 
                     clearDisplay:!equals,
                     values
                })
          
            }

           
        }


        addDigit(n){
            if(n === '.' && this.state.displayValue.includes('.')){
                    return   // para o usuario não digitar dois pontos
            }

            const clearDisplay  = this.state.displayValue === '0'  || this.state.clearDisplay 

            // limpar o display caso tiver muito zero a esquerda

            const currentValue = clearDisplay ? '' : this.state.displayValue

            const displayValue = currentValue + n
            this.setState({displayValue,clearDisplay:false})



                if(n !== '.' ){

                    const i = this.state.current 
                    const newValue = parseFloat(displayValue) 
                    const values = [...this.state.values]

                    values[i] = newValue

                    this.setState({values}) 

                    console.log(values) // ele pegar o primeiro elemento

                }
        }

    render(){
        const addDigit = n  => this.addDigit(n)

        const setOperation = op => this.setOperation(op)

        return (
            <div>
                <div className='calculator'>
                    <Display value={this.state.displayValue}/>
                    
                    <Button label="AC"  click={() => this.clearMemory()  } triple />
                    <Button label="/" click={setOperation} double />
                    <Button label="7"  click={addDigit}/>
                    <Button label="8"click={addDigit}/>
                    <Button label="9"click={addDigit}/>
                    <Button label="*"click={setOperation}  double />
                    <Button label="4"click={addDigit} />
                    <Button label="5"click={addDigit} />
                    <Button label="6"click={addDigit}  />
                    <Button label="-" click={setOperation} double />
                    <Button label="1" click={addDigit}/>
                    <Button label="2" click={addDigit}/>
                    <Button label="3" click={addDigit}/>
                    <Button label="+"click={setOperation} double  />
                    <Button label="0" click={addDigit}/>
                    <Button label="."click={addDigit} />
                    <Button label="=" click={setOperation}  double/>
                
                </div>

            </div>
        )

    }

}