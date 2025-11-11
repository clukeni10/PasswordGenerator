const slider = document.getElementById("range") as HTMLInputElement;
const rangeValue = document.getElementById("rangeValue") as HTMLSpanElement;
const generatedPassword = document.getElementById("generatedPassword") as HTMLElement;
const copyButton = document.getElementById("copy") as HTMLButtonElement;
const confirmMsg = document.getElementById("msg") as HTMLParagraphElement;
const toastElement = document.getElementById("toast") as HTMLDivElement;
const generateButton = document.getElementById("generate") as HTMLButtonElement;

// Checkboxes
const lowerCheck = document.getElementById("lowercase") as HTMLInputElement;
const upperCheck = document.getElementById("uppercase") as HTMLInputElement;
const numbersCheck = document.getElementById("numbers") as HTMLInputElement;
const symbolsCheck = document.getElementById("symbols") as HTMLInputElement;

// Elementos da barra de força
const strengthBar = document.getElementById("bar") as HTMLDivElement;
const strengthMsg = document.getElementById("strengthMsg") as HTMLParagraphElement;

const charSets = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$^&()_+-=[]{}|;:'\",.<>?/",
};

// Função de toast
function showToast(message: string) {
  toastElement.textContent = message;
  toastElement.classList.add("show");
  setTimeout(() => toastElement.classList.remove("show"), 3000);
}

// Função para gerar senha
function generatePassword(length: number): string {
  let availableChars = "";

  if (lowerCheck.checked) availableChars += charSets.lower;
  if (upperCheck.checked) availableChars += charSets.upper;
  if (numbersCheck.checked) availableChars += charSets.numbers;
  if (symbolsCheck.checked) availableChars += charSets.symbols;

  if (availableChars.length === 0) {
    showToast("⚠ Seleciona pelo menos um tipo de caractere!");
    return "";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  return password;
}

// Função para verificar força da senha
function checkPasswordStrength(password: string) {
  let strength = 0;

  if (password.length >= 6) strength++;
  if (password.match(/[a-z]+/)) strength++;
  if (password.match(/[A-Z]+/)) strength++;
  if (password.match(/[0-9]+/)) strength++;
  if (password.match(/[@$!%*?&]+/)) strength++;

  switch (strength) {
    case 0:
      strengthBar.style.width = "0%";
      strengthMsg.textContent = "";
      break;
    case 1:
    case 2:
      strengthBar.style.width = "33%";
      strengthBar.style.backgroundColor = "red";
      strengthMsg.textContent = "Fraca";
      strengthMsg.style.color = "red";
      break;
    case 3:
    case 4:
      strengthBar.style.width = "66%";
      strengthBar.style.backgroundColor = "orange";
      strengthMsg.textContent = "Média";
      strengthMsg.style.color = "orange";
      break;
    case 5:
      strengthBar.style.width = "100%";
      strengthBar.style.backgroundColor = "green";
      strengthMsg.textContent = "Forte";
      strengthMsg.style.color = "green";
      break;
  }
}

// Atualizar valor do range
slider.addEventListener("input", () => {
  rangeValue.textContent = slider.value;
});

// Gerar senha ao clicar no botão
generateButton.addEventListener("click", () => {
  const length = Number(slider.value);
  const password = generatePassword(length);

  if (password) {
    generatedPassword.textContent = password;
    checkPasswordStrength(password);
  }
});

// Copiar senha
copyButton.addEventListener("click", () => {
  const textToCopy = generatedPassword.textContent || "";

  if (!textToCopy) {
    showToast("Nenhuma password gerada ainda!");
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast("Password copiada para a área de transferência!");
      confirmMsg.textContent = "✔ Copiado!";
      setTimeout(() => (confirmMsg.textContent = ""), 2000);
    }).catch(err => {
      console.error("Erro ao copiar:", err);
      showToast("Erro ao copiar a password.");
    });
  } else {
    alert("O teu navegador não suporta a cópia automática.");
  }
});

// Valor inicial do range
rangeValue.textContent = slider.value;
