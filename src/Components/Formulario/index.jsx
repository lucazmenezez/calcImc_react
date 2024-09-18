import { useState } from "react";
import TabelaIMC from "../TabelaIMC";
import './style.css';

const Formulario = () => {
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [imc, setImc] = useState(null);
    const [mensagem, setMensagem] = useState('');

    const resultado = (event) => {
        event.preventDefault();  // Prevenir envio do formulário vazio
        if (altura > 0 && peso > 0) {
            const alturaMetros = altura / 100;  // Converter de cm para metros
            const IMC = peso / (alturaMetros * alturaMetros);
            setImc(IMC.toFixed(2));

            if (IMC < 18.5) {
                setMensagem('Você está abaixo do peso.');
            } else if (IMC >= 18.5 && IMC <= 24.9) {
                setMensagem('Seu peso está normal.');
            } else if (IMC >= 25 && IMC <= 29.9) {
                setMensagem('Você está com sobrepeso.');
            } else if (IMC >= 30 && IMC <= 34.9) {
                setMensagem('Você está com obesidade grau I.');
            } else if (IMC >= 35 && IMC <= 39.9) {
                setMensagem('Você está com obesidade grau II.');
            } else {
                setMensagem('Você está com obesidade grau III.');
            }
        } else {
            setMensagem('Por favor, insira valores válidos.');
            setImc(null);
        }
    };

    return (
        <div>
            <form className="form" onSubmit={resultado}>
                <h1 className="title">Calculadora de IMC</h1>
                <div className="container">
                    <div className="input1">
                        <label htmlFor="altura">Altura (cm)</label>
                        <input
                            type="number"
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                            name="altura"
                            id="altura"
                            placeholder="Digite sua altura"
                            min="1"
                            required
                        />
                    </div>
                    <div className="input2">
                        <label htmlFor="peso">Peso (kg)</label>
                        <input
                            type="number"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            name="peso"
                            id="peso"
                            placeholder="Digite seu peso"
                            min="1"
                            required
                        />
                    </div>
                </div>
                <button type="submit">Calcular IMC</button>
                {imc && (
                    <div className="resultado">
                        <b>Seu IMC é</b>: {imc} <br />
                        {mensagem}
                    </div>
                )}
            {imc && <TabelaIMC />}  {/* Exibir a tabela quando o IMC for calculado */}
            </form>
        </div>
    );
};

export default Formulario;