// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// GSAP Animation on buttons
gsap.utils.toArray("button").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(cursor, { scale: 2.5, duration: 0.3, backgroundColor: "#ff80ab" });
    gsap.to(btn, { scale: 1.05, duration: 0.3 });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(cursor, { scale: 1, duration: 0.3, backgroundColor: "#e91e63" });
    gsap.to(btn, { scale: 1, duration: 0.3 });
  });
});

// Age Calculator Logic
const calcAgeBtn = document.getElementById("calcAgeBtn");
const dobInput = document.getElementById("dob");
const ageResult = document.getElementById("ageResult");

calcAgeBtn.onclick = () => {
  const dobValue = dobInput.value;
  if (!dobValue) {
    alert("অনুগ্রহ করে জন্মতারিখ দিন");
    return;
  }
  const dob = new Date(dobValue);
  const now = new Date();

  if (dob > now) {
    alert("ভবিষ্যতের তারিখ দিতে পারবেন না");
    return;
  }

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // সময়ের হিসাব
  const diffMs = now - dob;
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  // DOM আপডেট
  document.getElementById("years").innerText = years;
  document.getElementById("months").innerText = months;
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = totalHours;
  document.getElementById("minutes").innerText = totalMinutes;
  document.getElementById("seconds").innerText = totalSeconds;

  // পরবর্তী জন্মদিন
  let nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const daysLeft = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
  document.getElementById(
    "nextBirthday"
  ).innerText = `➡️ পরবর্তী জন্মদিনে ⏳ ${daysLeft} দিন বাকি।`;

  ageResult.classList.remove("hidden");
};

// Wish Card Generator
const generateWishBtn = document.getElementById("generateWishBtn");
const wishCard = document.getElementById("wishCard");
const downloadWishBtn = document.getElementById("downloadWishBtn");

generateWishBtn.onclick = () => {
  const friendName = document.getElementById("friendName").value.trim();
  const friendDob = document.getElementById("friendDob").value;
  const wishMessage = document.getElementById("wishMessage").value.trim();

  if (!friendName || !friendDob || !wishMessage) {
    alert("সব তথ্য সঠিকভাবে পূরণ করুন");
    return;
  }

  const birthDateObj = new Date(friendDob);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = birthDateObj.toLocaleDateString("bn-BD", options);

  document.getElementById("wishName").innerText = friendName;
  document.getElementById("wishDate").innerText = formattedDate;
  document.getElementById("wishText").innerText = wishMessage;

  wishCard.classList.remove("hidden");
  downloadWishBtn.classList.remove("hidden");
};

// Download Wish Card as PNG
downloadWishBtn.onclick = () => {
  html2canvas(wishCard).then((canvas) => {
    const link = document.createElement("a");
    link.download = `wish_for_${
      document.getElementById("wishName").innerText
    }.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
};
