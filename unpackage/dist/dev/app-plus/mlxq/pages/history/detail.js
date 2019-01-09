
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["body { background-color: #F0F0F0; }\n.",[1],"content { margin: ",[0,10],"; background-color: #FFFFFF; border-radius: ",[0,15],"; }\n",],undefined,{path:"./pages/history/detail.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/history/detail.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      