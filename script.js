
const billingToggle = document.getElementById("billing-toggle");
const monthlyLabel = document.getElementById("monthly-label");
const yearlyLabel = document.getElementById("yearly-label");
const selectionMessage = document.getElementById("selection-message");

const priceElements = document.querySelectorAll(".amount");
const billingNotes = document.querySelectorAll(".billing-note");

let isYearly = false;

function updatePrices() {
  priceElements.forEach((price, index) => {
    const monthlyPrice = Number(price.dataset.monthly);
    const yearlyPrice = Number(price.dataset.yearly);

    price.textContent = isYearly ? yearlyPrice : monthlyPrice;

    if (index === 0) {
      billingNotes[index].textContent = "Free forever";
    } else {
      billingNotes[index].textContent = isYearly
        ? `Billed $${yearlyPrice * 12} yearly`
        : "Billed monthly";
    }
  });

  billingToggle.setAttribute("aria-pressed", String(isYearly));
  billingToggle.setAttribute(
    "aria-label",
    isYearly ? "Switch to monthly billing" : "Switch to yearly billing"
  );

  monthlyLabel.classList.toggle("active-label", !isYearly);
  yearlyLabel.classList.toggle("active-label", isYearly);
}

billingToggle.addEventListener("click", () => {
  isYearly = !isYearly;
  updatePrices();
});

document.querySelectorAll(".plan-button").forEach(button => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    selectionMessage.textContent =
      `You selected the ${plan} plan with ${isYearly ? "yearly" : "monthly"} billing.`;
  });
});

updatePrices();
