import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CommonfilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'commonfilter',
})
export class CommonfilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items, value, code): any {
    let re = "";

    //단위
    if(code === "commonCode1"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //조달구분
    if(code === "commonCode2"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //통화
    if(code === "commonCode3"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //품목형태
    if(code === "commonCode4"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //발의자
    if(code === "commonCode5"){
      for(let item in items){
        if(items[item].USER_ID === value){
          re = items[item].USER_NM;
        }
      }
    }

    //계정과목
    if(code === "commonCode6"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //증빙자료
    if(code === "commonCode7"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //부서
    if(code === "commonCode8"){
      for(let item in items){
        if(items[item].DEPT_CD === value){
          re = items[item].DEPT_NAME;
        }
      }
    }

    //사업구분
    if(code === "commonCode9"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //현재상태
    if(code === "commonCode10"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //발주처
    if(code === "commonCode11"){
      for(let item in items){
        if(items[item].BY_CD === value){
          re = items[item].BY_NM;
        }
      }
    }

    //담당자
    if(code === "commonCode12"){
      for(let item in items){
        if(items[item].SABUN === value){
          re = items[item].HNAME;
        }
      }
    }

    //거래처
    if(code === "commonCode13"){
      for(let item in items){
        if(items[item].BY_CD === value){
          re = items[item].BY_NM;
        }
      }
    }

    //영업부서
    if(code === "commonCode14"){
      for(let item in items){
        if(items[item].DEPT_CD === value){
          re = items[item].DEPT_NAME;
        }
      }
    }

    //영업담당
    if(code === "commonCode15"){
      for(let item in items){
        if(items[item].SABUN === value){
          re = items[item].HNAME;
        }
      }
    }

    //제품코드
    if(code === "commonCode16"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //수금구분
    if(code === "commonCode17"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //입금구분
    if(code === "commonCode18"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //지급처
    if(code === "commonCode19"){
      for(let item in items){
        if(items[item].BANK_CD === value){
          re = items[item].BANK_NAME;
        }
      }
    }

    //발주형태
    if(code === "commonCode20"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //지불방법
    if(code === "commonCode21"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //조달구분
    if(code === "commonCode22"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //내외자
    if(code === "commonCode23"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //품목형태
    if(code === "commonCode24"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //제품군
    if(code === "commonCode25"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //검사구분
    if(code === "commonCode26"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //상태
    if(code === "commonCode27"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //품목구분
    if(code === "commonCode28"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //입고유형
    if(code === "commonCode29"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //상태
    if(code === "commonCode30"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //조치구분
    if(code === "commonCode31"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //검사결과
    if(code === "commonCode32"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //불량항목
    if(code === "commonCode33"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //검사종류
    if(code === "commonCode34"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //검사구분
    if(code === "commonCode35"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //공정
    if(code === "commonCode36"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }

    //견적상태
    if(code === "commonCode37"){
      for(let item in items){
        if(items[item].CODE === value){
          re = items[item].NAME1;
        }
      }
    }






    //SCB10 GRID - 단가
    if(code === "filter1"){
      if(value > 1){
        re = "SETS";
      }else if(value == 1){
        re = "SET";
      }
    }

    //PEG08 TAB2 GRID - 월
    if(code === 'getMonth'){
      re = value.substring(0,4) + "-" + value.substring(4,6);
    }

    //금액 콤마
    if(code === 'money_filter'){
      if(value != '' && value != undefined){
        var len, point;
            value = value + "";
            point = value.length % 3 ;
            len = value.length;

            re = value.substring(0, point);
            while (point < len) {
                if (re != "") re += ",";
                re += value.substring(point, point + 3);
                point += 3;
            }
      }
    }




    return re;
  }
}
