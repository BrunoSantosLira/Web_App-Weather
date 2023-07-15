document.getElementById("formulario").addEventListener("submit", function(event) {
event.preventDefault(); // Impede o envio padrão do formulário

let cidade = window.document.getElementById('cidade').value
clima(cidade)
window.document.getElementById('cidade').value = ''

})

async function puxar(){
    if ('geolocation' in navigator) {
         navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&dt=1643803200&appid=69846968598a1f2b7b518936c1921345`)
          console.log(resposta)
      
          if(resposta.status == 200){
              const dados = await resposta.json();
      
              console.log(dados)
              let nome = dados['name']
              window.document.getElementById('nome_cidade').innerText = nome
      
              //humidity
              let umidade = dados['main']['humidity']
              window.document.getElementById('umidade').innerText = umidade
              
              let temperatura = dados['main']['temp']
              window.document.getElementById('temperatura').innerText = temperatura + '°C'
              
              let vento = dados['wind']['speed']
              window.document.getElementById('vento').innerText = vento
      
              let icone_caixa = window.document.getElementById('icon')
      
              let icon = dados['weather'][0]['icon']
              icone_caixa.src = `https://openweathermap.org/img/wn/${icon}@4x.png`

              let pais = dados['sys']['country']
              let img_pais = window.document.getElementById('bandeira')
              img_pais.src = `https://flagsapi.com/${pais}/flat/32.png`

          }
          
        });
      } else {
        console.log('Geolocalização não suportada.');
      }
}

async function clima(cidade=''){
     //forecast => previsão
    //weather => clima atual
    if(cidade == ''){
      puxar()
      return
    }

    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&dt=1643803200&appid=69846968598a1f2b7b518936c1921345`)
    console.log(resposta)

    if(resposta.status == 200){
        const dados = await resposta.json();

        console.log(dados)
        let nome = dados['name']
        window.document.getElementById('nome_cidade').innerText = nome

        //humidity
        let umidade = dados['main']['humidity']
        window.document.getElementById('umidade').innerText = umidade
        
        let temperatura = dados['main']['temp']
        window.document.getElementById('temperatura').innerText = temperatura + '°C'
        
        let vento = dados['wind']['speed']
        window.document.getElementById('vento').innerText = vento

        let icone_caixa = window.document.getElementById('icon')

        let icon = dados['weather'][0]['icon']
        icone_caixa.src = `https://openweathermap.org/img/wn/${icon}@4x.png`

        let pais = dados['sys']['country']
        let img_pais = window.document.getElementById('bandeira')
        img_pais.src = `https://flagsapi.com/${pais}/flat/32.png`
    }
    //https://openweathermap.org/img/wn/10d@4x.png => link da imagem
}
