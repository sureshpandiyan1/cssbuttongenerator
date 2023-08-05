function genBtns(ltrspacing, styles, btnsize)  {
  this.ltrspacing = ltrspacing,
  this.styles = styles;
  this.btnsize = btnsize;
}

genBtns.prototype.toHTML = function(theitems,thelists) {
  let count = 0;
  var gg = document.getElementById("sss")
  var thediv = document.createElement("div")
  thediv.setAttribute("id",thelists+"_styl")
  count = count - 1
  for (let thelist of theitems) {
    count++;
    thediv.innerHTML += "<div id="+thelists+count+">" + thelist + "</div>"
  }
  gg.appendChild(thediv)
}

genBtns.prototype.appendit = function(idvalue, values) {
  return document.getElementById(idvalue).appendChild(values)
}

const allprops = [
    ['normal','wide','tight'],
    ['A','a','i','b',"s"],
    ['small','medium','large']
];

var thebtns = new genBtns(...allprops)


function loadprops(thebtns) {
  const propnames = ['ltr','fnt','btn']
  var theNums;
  for (i = 0; i < propnames.length; i++) {
    if (propnames[i] == 'ltr') {
      thebtns.toHTML(thebtns.ltrspacing,"ltr")
    } else if(propnames[i] == 'fnt') {
      thebtns.toHTML(thebtns.styles, "fnt")
    } else if(propnames[i] == 'btn') {
      thebtns.toHTML(thebtns.btnsize,"btn")
  } else {
    console.log("not exist values")
    break;
  }
}
}


function propBtns(ltrspacing, styles, btnsize, bids, ltrs) {
  genBtns.call(ltrspacing, styles, btnsize)
  this.bids = bids;
  this.ltrs = ltrs;
}


propBtns.prototype = new genBtns();
propBtns.prototype.constructor = propBtns;

const thepro = [
  ...allprops,
  ["ltr_styl","fnt_styl","btn_styl"],
  ["ltr","fnt","btn"]
];

var propz = new propBtns(...thepro)



function letterspacing(k) {
  switch (k) {
    case 'ltr0':
      return 1
      break;
    case 'ltr1':
      return 2
      break;
    case 'ltr2':
      return -1
      break;
  }
}


function transform(k) {
  switch (k) {
    case 'fnt0':
      return 'uppercase'
      break;
    case 'fnt1':
      return 'lowercase'
      break;
  }
}

function ww(k) {
  switch (k) {
    case 'btn0':
      return 46 * 2;
      break;
    case 'btn1':
      return 97;
      break;
    case 'btn2':
      return 60 * 2;
      break;
  }
}


propBtns.prototype.clrbkg = function thebox(theb) {
  const ths = document.getElementById("box")

  if (theb == "brange") {
    document.getElementById(theb).oninput = function() {
      ths.style.borderRadius = document.getElementById(theb).value + "px"
    }
  } else {
    document.getElementById(theb).onkeyup = function() {
    var mm;
    document.getElementById(theb).style.opacity = 1;
    mm = document.getElementById(theb).value
    if (theb == "clr_genbtn") {
      ths.style.background = mm

    } else if (theb == "bkg_genbtn") {
      ths.style.color = mm
    }
  }
}
}

var kk =[];
propBtns.prototype.gens = function() {
  var m = document.getElementById("box").style.cssText.split(";")
  var y;
  var ss = function(num1,num2) {
    if (num1 > num2 || num1 == num2) {
      return 1
    }
    return -1
  }
  m.sort(ss)
  y = ".cssbutton_gen {"
  for (let x of m) {
      y += x +";" + "\n"
  }
  y += "}"


  kk.push(y.replace(',','').replace('{;','{'))

  return kk[kk.length - 1]
}


var a = [], b = [], c = [];
var m = [];
propBtns.prototype.thatone = function(idvalue,styl) {
    const th = document.getElementById("box")
    const ms = document.getElementById(idvalue)
    var thepr;
    ms.addEventListener("click", function(e) {
      var g;
      var h = document.getElementById(idvalue).children
      for (i =0; i < h.length; i++) {
        if (styl+i == e.target.id) {
            if(styl+i == "btn"+i) {
              a.push(document.getElementById(styl+i).textContent)
              document.getElementById(styl+i).style.color = 'white';
              th.style.width = ww("btn"+i)+"px"
              th.style.lineHeight = ww("btn"+i) / 2 - 4 +"px"
              th.style.height = ww("btn"+i) / 2 - 4 +"px"
            } if(styl+i == "fnt"+i) {
              b.push(document.getElementById(styl+i).textContent)
              document.getElementById(styl+i).style.color = 'white';
              if (0 < i || i < 2) {
                th.style.textTransform = transform("fnt"+i)
                th.style.textDecoration = ''
                th.style.fontWeight = ''
                th.style.fontStyle = ''
              }
              if (i == 2) {
                th.style.fontStyle = 'italic'
              }
              if (i == 3) {
                th.style.fontWeight = 'bold'
                th.style.textDecoration = 'none';
                th.style.textTransform = '';
                th.style.fontStyle = ''
              } else if(i == 4) {
                th.style.textDecoration = 'line-through'
                th.style.fontWeight = '';
                th.style.textTransform = '';
                th.style.fontStyle = ''
              }
            } if(styl+i == "ltr"+i) {
              c.push(document.getElementById(styl+i).textContent)
              document.getElementById(styl+i).style.color = 'white';
              th.style.letterSpacing = letterspacing("ltr"+i)+"px"
            }
        }  else {
            document.getElementById(styl+i).style.color = 'rgb(255 255 255 / 45%)';
        }
    }
  });
}




propBtns.prototype.mall = function() {
    propz.clrbkg("clr_genbtn")
    propz.clrbkg("bkg_genbtn")
    propz.clrbkg("brange")
    propz.thatone(propz.bids[0],propz.ltrs[0])
    propz.thatone(propz.bids[1],propz.ltrs[1])
    propz.thatone(propz.bids[2],propz.ltrs[2])
}


document.getElementById("ges").onclick = function() {
  navigator.clipboard.writeText(propz.gens());
  document.getElementById("ges").innerHTML = "code copied!"
  setTimeout(function() {
    document.getElementById("ges").innerHTML = "code copy"
    window.location.reload()
  },1500)
}


loadprops(thebtns)
propz.mall()
