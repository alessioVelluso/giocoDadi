const giocoDadi = (primoNumero, secondNumero) => {
    var d1, d2, sum, tentativi = 0;
    do {
        d1 = getRandomNumber(1, 7);
        d2 = getRandomNumber(1, 7);
        sum = d1 + d2;
        tentativi++;
        
        console.log(`Primo dado: ${d1}`,'\n',
        `Secondo dado: ${d2}`,'\n',
        `La tua somma è ${sum}`,'\n',
        '');

    }while(sum != primoNumero && sum !=secondNumero);

    console.log(`Trovato numero ${sum} in ${tentativi} tentativi`);
}

giocoDadi(2, 3);