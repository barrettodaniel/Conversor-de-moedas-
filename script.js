 document.getElementById("converter").addEventListener("click", async () => {
        const valor = parseFloat(document.getElementById("valor").value);
        const moedaOrigem = document.getElementById("moedaOrigem").value;
        const moedaDestino = document.getElementById("moedaDestino").value;
        const resultadoDiv = document.getElementById("resultado");

        if (isNaN(valor)) {
            resultadoDiv.textContent = "Por favor, insira um valor válido.";
            return;
        }

        if (moedaOrigem === moedaDestino) {
            resultadoDiv.textContent = "Escolha moedas diferentes para conversão.";
            return;
        }

        try {
            const url = `https://economia.awesomeapi.com.br/json/last/${moedaOrigem}-${moedaDestino}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error("Erro ao buscar cotação");

            const data = await response.json();
            const par = `${moedaOrigem}${moedaDestino}`;
            const taxa = parseFloat(data[par].bid);

            const convertido = valor * taxa;
            resultadoDiv.textContent = `${valor.toFixed(2)} ${moedaOrigem} = ${convertido.toFixed(2)} ${moedaDestino}`;
        } catch (error) {
            resultadoDiv.textContent = "Erro ao converter. Tente novamente.";
            console.error(error);
        }
    });
