(() => {
  let startMinutes = 8 * 60 + 15;
  let endMinutes = 16 * 60 + 50;
  const $ = id => document.getElementById(id);
  function readTime(value) { const [h,m] = value.split(":").map(Number); return h*60+m; }
  function clock(n) { return `${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`; }
  function duration(n) {
    const h=Math.floor(n/60),m=n%60;
    if(!h) return `${m} דקות`;
    if(!m) return h===1 ? "שעה אחת" : `${h} שעות`;
    return `${h===1 ? "שעה" : `${h} שעות`} ו־${m} דקות`;
  }
  function update() {
    const now=new Date(), nowMinutes=now.getHours()*60+now.getMinutes(), total=endMinutes-startMinutes;
    const passed=Math.max(0,Math.min(total,nowMinutes-startMinutes)), remaining=total-passed, percent=passed/total*100;
    $("percent").textContent=`${percent.toFixed(2)}%`; $("fill").style.width=`${percent}%`;
    $("progress").setAttribute("aria-valuenow",percent.toFixed(2)); $("passed").textContent=clock(passed); $("remaining").textContent=clock(remaining);
    $("totalLabel").textContent=`יום של ${duration(total)}`; $("schedule").textContent=`היום: ${clock(startMinutes)}–${clock(endMinutes)}`;
    if(nowMinutes<startMinutes){$("elapsed").textContent="היום עדיין לא התחיל";$("status").textContent=`מתחילים ב־${clock(startMinutes)}`;}
    else if(nowMinutes>=endMinutes){$("elapsed").textContent=`עברו ${duration(total)}`;$("status").textContent="היום הושלם!";}
    else{$("elapsed").textContent=`עברו ${duration(passed)}`;$("status").textContent="מתעדכן אוטומטית בכל דקה";}
  }
  $("saveTimes").addEventListener("click",()=>{
    const s=$("startTime").value,e=$("endTime").value;
    if(!s||!e){$("settingsMessage").textContent="יש לבחור שעת התחלה ושעת סיום.";return;}
    const ns=readTime(s),ne=readTime(e);
    if(ne<=ns){$("settingsMessage").textContent="שעת הסיום צריכה להיות מאוחרת משעת ההתחלה באותו יום.";return;}
    startMinutes=ns;endMinutes=ne;$("settingsMessage").textContent=`השעות עודכנו: ${clock(ns)}–${clock(ne)}.`;update();
  });
  $("refresh").addEventListener("click",update); update(); setInterval(update,1000);
})();