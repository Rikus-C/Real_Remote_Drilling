/*[2.1] All event listeners*/
/* Touch move */
document.addEventListener('touchmove', function (event) {
  event.preventDefault(); // Prevent the default touch move behavior
  Panel.TouchClickMove(event); // Call the Panel.TouchClickMove function
});
/*Password button*/
document.getElementById("B-00").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Keypad();
});
/*Latch button types*/
document.getElementById("B-01").addEventListener("click", () => {
  event.preventDefault();
  Panel.Unlock();
});
document.getElementById("B-02").addEventListener("click", () => {
  event.preventDefault();
  Panel.Lock();
});
/*Press and release button types*/
document.getElementById("B-03").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-03", "down");
});
document.getElementById("B-03").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-03", "up");
});
document.getElementById("B-04").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-04", "down");
});
document.getElementById("B-04").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-04", "up");
});
/*Latch button types*/
document.getElementById("B-05").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-05", "none");
});
document.getElementById("B-06").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-06", "none");
});
document.getElementById("B-07").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-07", "none");
});
document.getElementById("B-08").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-08", "none");
});
document.getElementById("B-09").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-09", "none");
});
document.getElementById("B-10").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-10", "none");
});
document.getElementById("B-11").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-11", "none");
});
/*Press and release button types*/
document.getElementById("B-12").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-12", "down");
});
document.getElementById("B-12").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-12", "up");
});
document.getElementById("B-13").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-13", "down");
});
document.getElementById("B-13").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-13", "up");
});
document.getElementById("B-14").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-14", "down");
});
document.getElementById("B-14").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-14", "up");
});
document.getElementById("B-15").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-15", "down");
});
document.getElementById("B-15").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-15", "up");
});
document.getElementById("B-16").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-16", "down");
});
document.getElementById("B-16").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-16", "up");
});
document.getElementById("B-17").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-17", "down");
});
document.getElementById("B-17").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-17", "up");
});
document.getElementById("B-18").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-18", "down");
});
document.getElementById("B-18").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-18", "up");
});
document.getElementById("B-19").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-19", "down");
});
document.getElementById("B-19").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-19", "up");
});
document.getElementById("B-20").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-20", "down");
});
document.getElementById("B-20").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-20", "up");
});
document.getElementById("B-21").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-21", "down");
});
document.getElementById("B-21").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-21", "up");
});
document.getElementById("B-22").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-22", "down");
});
document.getElementById("B-22").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-22", "up");
});
document.getElementById("B-23").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-23", "down");
});
document.getElementById("B-23").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-23", "up");
});
document.getElementById("B-24").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-24", "down");
});
document.getElementById("B-24").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-24", "up");
});
document.getElementById("B-25").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-25", "down");
});
document.getElementById("B-25").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-25", "up");
});
document.getElementById("B-26").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-26", "down");
});
document.getElementById("B-26").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-26", "up");
});
document.getElementById("B-27").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-27", "down");
});
document.getElementById("B-27").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-27", "up");
});
document.getElementById("B-28").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-28", "down");
});
document.getElementById("B-28").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-28", "up");
});
document.getElementById("B-29").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-29", "down");
});
document.getElementById("B-29").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-29", "up");
});
document.getElementById("B-30").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-30", "down");
});
document.getElementById("B-30").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-30", "up");
});
document.getElementById("B-31").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-31", "down");
});
document.getElementById("B-31").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-31", "up");
});
document.getElementById("B-32").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-32", "down");
});
document.getElementById("B-32").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-32", "up");
});
document.getElementById("B-33").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-33", "down");
});
document.getElementById("B-33").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-33", "up");
});
document.getElementById("B-34").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-34", "down");
});
document.getElementById("B-34").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-34", "up");
});
document.getElementById("B-35").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-35", "down");
});
document.getElementById("B-35").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-35", "up");
});
document.getElementById("B-36").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-36", "down");
});
document.getElementById("B-36").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-36", "up");
});
document.getElementById("B-37").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-37", "down");
});
document.getElementById("B-37").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-37", "up");
});
document.getElementById("B-38").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-38", "down");
});
document.getElementById("B-38").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-38", "up");
});
/*Latch button types*/
document.getElementById("B-39").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-39", "none");
});
document.getElementById("B-40").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-40", "none");
});
/*Press and release button types*/
document.getElementById("B-41").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-41", "down");
});
document.getElementById("B-41").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-41", "up");
});
document.getElementById("B-42").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-42", "down");
});
document.getElementById("B-42").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-42", "up");
});
document.getElementById("B-43").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-43", "down");
});
document.getElementById("B-43").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-43", "up");
});
document.getElementById("B-44").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-44", "down");
});
document.getElementById("B-44").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-44", "up");
});
document.getElementById("B-45").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-45", "down");
});
document.getElementById("B-45").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-45", "up");
});
document.getElementById("B-46").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-46", "down");
});
document.getElementById("B-46").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-46", "up");
});
document.getElementById("B-47").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-47", "down");
});
document.getElementById("B-47").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-47", "up");
});
document.getElementById("B-48").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-48", "down");
});
document.getElementById("B-48").addEventListener("touchend", () => {
  event.preventDefault();
  Panel.Button_Pressed("B-48", "up");
});
/*Special button types*/
document.getElementById("B-49").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Exit_Reload();
});
document.getElementById("B-50").addEventListener("touchstart", () => {
  event.preventDefault();
  Panel.Min();
});
