const cfg = window.SITE_CONFIG || {};

function qs(name){
  return new URLSearchParams(window.location.search).get(name);
}

function moneyINR(n){
  return new Intl.NumberFormat("en-IN", {
    style:"currency", currency:"INR", maximumFractionDigits:0
  }).format(n);
}

function applyAreaPersonalisation(){
  const area = (qs("area") || "").toLowerCase();
  const hero = document.querySelector("[data-area-headline]");
  const intro = document.querySelector("[data-area-intro]");
  const areaSelect = document.querySelector("#area");

  const map = {
    gariahat: {
      label:"গড়িয়াহাট",
      headline:"এই পুজোয় গড়িয়াহাটে আপনার দোকানকে আরও বেশি স্থানীয় ক্রেতার সামনে আনুন"
    },
    newmarket: {
      label:"নিউ মার্কেট",
      headline:"এই পুজোয় নিউ মার্কেটে আপনার দোকানকে আরও বেশি স্থানীয় ক্রেতার সামনে আনুন"
    },
    hatibagan: {
      label:"হাতিবাগান",
      headline:"এই পুজোয় হাতিবাগানে আপনার দোকানকে আরও বেশি স্থানীয় ক্রেতার সামনে আনুন"
    }
  };

  if(map[area]){
    if(hero) hero.textContent = map[area].headline;
    if(intro) intro.textContent = `${map[area].label}-এর পোশাক ও ফ্যাশন ব্যবসার জন্য Facebook ও Instagram বিজ্ঞাপন—স্ট্র্যাটেজি, সেটআপ ও অপ্টিমাইজেশন।`;
    if(areaSelect) areaSelect.value = area;
  }
}

function collectTracking(){
  const p = new URLSearchParams(location.search);
  return {
    utm_source:p.get("utm_source") || "",
    utm_medium:p.get("utm_medium") || "",
    utm_campaign:p.get("utm_campaign") || "",
    utm_content:p.get("utm_content") || "",
    utm_term:p.get("utm_term") || "",
    fbclid:p.get("fbclid") || "",
    landing_area:p.get("area") || ""
  };
}

async function logToSheet(payload){
  const url = (cfg.googleAppsScriptUrl || "").trim();
  if(!url) return;
  try{
    fetch(url,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=UTF-8"},
      body:JSON.stringify(payload),
      keepalive:true
    });
  }catch(e){
    console.warn("Sheet logging failed:",e);
  }
}

function buildWhatsAppMessage(d){
  const fee = moneyINR(cfg.managementFee || 27500);
  const lines = [
    "নমস্কার, আমি পুজো Meta Ads Campaign-এর জন্য আবেদন করেছি।",
    "",
    `দোকানের নাম: ${d.storeName}`,
    `এলাকা: ${d.areaLabel}`,
    `প্রধান পণ্য: ${d.categoryLabel}`,
    `মাসিক Meta ad budget: ${d.adBudgetLabel}`,
    `ম্যানেজমেন্ট ফি (${fee}/মাস + ad spend) গ্রহণযোগ্য?: ${d.feeFitLabel}`,
    `কবে শুরু করতে চান: ${d.startLabel}`,
    "",
    `Lead priority: ${d.priority}`,
    d.tracking.utm_campaign ? `Campaign: ${d.tracking.utm_campaign}` : ""
  ].filter(Boolean);
  return lines.join("\n");
}

document.addEventListener("DOMContentLoaded",()=>{
  applyAreaPersonalisation();

  const priceEls = document.querySelectorAll("[data-fee]");
  priceEls.forEach(el => el.textContent = moneyINR(cfg.managementFee || 27500));

  const maxEls = document.querySelectorAll("[data-max-clients]");
  maxEls.forEach(el => el.textContent = cfg.maxSeasonClients || 5);

  const form = document.querySelector("#leadForm");
  if(!form) return;

  form.addEventListener("submit",(ev)=>{
    ev.preventDefault();
    const fd = new FormData(form);
    const status = document.querySelector("#formStatus");

    const adBudget = fd.get("adBudget");
    const feeFit = fd.get("feeFit");
    const start = fd.get("start");

    let priority = "MEDIUM";
    let qualified = true;

    if(adBudget === "under20" || feeFit === "no"){
      qualified = false;
      priority = "NOT_FIT";
    } else if(
      (adBudget === "50to100" || adBudget === "100plus") &&
      feeFit === "yes" &&
      (start === "now" || start === "7days")
    ){
      priority = "HIGH";
    }

    const areaEl = form.elements["area"];
    const categoryEl = form.elements["category"];
    const adBudgetEl = form.elements["adBudget"];
    const feeFitEl = form.elements["feeFit"];
    const startEl = form.elements["start"];

    const payload = {
      submittedAt:new Date().toISOString(),
      qualified,
      priority,
      storeName:(fd.get("storeName") || "").trim(),
      applicantName:(fd.get("applicantName") || "").trim(),
      area:fd.get("area"),
      areaLabel:areaEl.options[areaEl.selectedIndex].text,
      category:fd.get("category"),
      categoryLabel:categoryEl.options[categoryEl.selectedIndex].text,
      adBudget,
      adBudgetLabel:adBudgetEl.options[adBudgetEl.selectedIndex].text,
      feeFit,
      feeFitLabel:feeFitEl.options[feeFitEl.selectedIndex].text,
      start,
      startLabel:startEl.options[startEl.selectedIndex].text,
      tracking:collectTracking(),
      pageUrl:location.href
    };

    // Log both qualified and disqualified applications for market-learning.
    logToSheet(payload);

    if(!qualified){
      status.className = "status show bad";
      status.innerHTML = "এই মুহূর্তে আমাদের ফুল-সার্ভিস ক্যাম্পেইনটি সম্ভবত আপনার বর্তমান বাজেটের সঙ্গে মিলছে না। আপনার তথ্য বাজার-গবেষণার জন্য নোট করা হয়েছে; ₹27,500+ ম্যানেজমেন্ট ফি ও আলাদা ad budget প্রস্তুত হলে আবার আবেদন করতে পারেন।";
      if(window.fbq) fbq("trackCustom","DisqualifiedApplication");
      return;
    }

    const number = (cfg.whatsappNumber || "").replace(/\D/g,"");
    if(!number || number.includes("X")){
      status.className = "status show bad";
      status.textContent = "সাইট মালিক এখনও WhatsApp নম্বর সেট করেননি। config.js-এ নম্বরটি বসান।";
      return;
    }

    const message = buildWhatsAppMessage(payload);
    const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

    // Save proof-of-submit in this tab. The thank-you page uses it to fire Lead once.
    sessionStorage.setItem("qualifiedLeadSubmitted","1");
    sessionStorage.setItem("lastWhatsAppUrl",waUrl);

    // Open WhatsApp from the direct user gesture; then move the original tab
    // to the conversion page. If popup blocking intervenes, thank-you has a manual button.
    window.open(waUrl,"_blank","noopener");

    const q = new URLSearchParams();
    if(payload.tracking.utm_campaign) q.set("utm_campaign",payload.tracking.utm_campaign);
    if(payload.tracking.landing_area) q.set("area",payload.tracking.landing_area);

    setTimeout(()=>{
      window.location.href = "thank-you.html" + (q.toString() ? "?" + q.toString() : "");
    },180);
  });
});
