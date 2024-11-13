

function gerarSenha(comprimento: number): string {
      const caracteres = {
            letrasMinusculas:
                  "abcdefghijklmnopqrstuvwyxz",
            letrasMaiusculas:
                  "ABCDEFGHIJKLMNOPQRSTUVWYXZ",
            numeros:
                  "0123456789",
            especiais:
                  "!@#$^&()_+-=[]{}|;:'\",.<>?/",
      };

      let senha = "";

      senha += caracteres.letrasMaiusculas[Math.floor(Math.random() * caracteres.letrasMaiusculas.length)];

      senha += caracteres.letrasMinusculas[Math.floor(Math.random() * caracteres.letrasMinusculas.length)];

      senha += caracteres.numeros[Math.floor(Math.random() * caracteres.numeros.length)];

      senha += caracteres.especiais[Math.floor(Math.random() * caracteres.especiais.length)];

      const todosCaracteres = caracteres.letrasMaiusculas + caracteres.letrasMinusculas + caracteres.numeros + caracteres.especiais;

      for (let i = senha.length; i < comprimento; i++) {
            senha += todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)];
      }

      senha = senha.split('').sort(() => 0.5 - Math.random()).join('');

      return senha;

}

document.getElementById("btn")?.addEventListener("click", () => {
      const senhaGerada = gerarSenha(15);
      const display = document.getElementById("display") as HTMLElement;
      display!.innerHTML = `Senha gerada:   <strong>${senhaGerada}</strong>`;
});