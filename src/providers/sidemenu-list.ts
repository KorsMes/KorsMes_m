import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the SidemenuListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SidemenuListProvider {

  constructor(public http: HttpClient) {}

  getSideMenus(){
    return  [
              {
                title: '구매단가',
                subPages: [
                            {
                              title: '구매단가발행',
                              component: 'PAF06',
                              acc_btn_a : '',
                              acc_btn_b : '',
                              acc_btn_c : '',
                              acc_btn_d : '',
                              acc_btn_e : ''
                            }
                          ]
              },


              {
                title: '전표관리',
                subPages: [
                            {
                              title: '지출내역 발행',
                              component: 'PDA12',
                              acc_btn_a : '',
                              acc_btn_b : '',
                              acc_btn_c : '',
                              acc_btn_d : '',
                              acc_btn_e : ''
                            }
                          ]
              },


              {
                title: '견적관리',
                subPages: [
                            {
                              title: '견적서 발행(을지)',
                              component: 'SCB10',
                              acc_btn_a : '',
                              acc_btn_b : '',
                              acc_btn_c : '',
                              acc_btn_d : '',
                              acc_btn_e : ''
                            }
                          ]
              },


              {
                title: '영업관리',
                subPages: [
                            {
                              title: '수주관리',
                              thirdPages: [
                                            {
                                              title: 'PJT 수주내역 조회',
                                              component: 'SEA12',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            },
                            {
                              title: '매출관리',
                              thirdPages: [
                                            {
                                              title: '매출내역 종합현황',
                                              component: 'SFA05',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            },
                            {
                              title: '수금관리',
                              thirdPages: [
                                            {
                                              title: '수금내역 종합현황',
                                              component: 'SHB04',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            }
                          ]
              },


              {
                title: '목표예산',
                subPages: [
                            {
                              title: '목표예산관리',
                              thirdPages: [
                                            {
                                              title: '목표기초원가 발행',
                                              component: 'PDH04',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            },
                            {
                              title: '월간업무보고',
                              thirdPages: [
                                            {
                                              title: '월말 요약보고서',
                                              component: 'PDD02',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            },
                                            {
                                              title: '자재투입 상세분석표',
                                              component: 'PDD06',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            }
                          ]
              },


              {
                title: '구매발주',
                subPages: [
                            {
                              title: 'PJT 발주처리',
                              thirdPages: [
                                            {
                                              title: '월 발주현황',
                                              component: 'PDB13',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            }
                          ]
              },


              {
                title: '자재관리',
                subPages: [
                            {
                              title: '입고의뢰관리',
                              thirdPages: [
                                            {
                                              title: '부품 입고대기 현황',
                                              component: 'PEA03',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            },
                            {
                              title: '자재입고관리',
                              thirdPages: [
                                            {
                                              title: '일자별 자재입고 현황',
                                              component: 'PEB14',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            },
                            {
                              title: '자재출고처리',
                              thirdPages: [
                                            {
                                              title: '설계/발주/입고/출고현황',
                                              component: 'PEC12',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            },
                            {
                              title: '자재재고관리',
                              thirdPages: [
                                            {
                                              title: '부품재고현황 조회',
                                              component: 'PEG01',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            },
                                            {
                                              title: '자재수불 집계표',
                                              component: 'PEG08',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            }
                          ]
              },


              {
                title: '품질관리',
                subPages: [
                            {
                              title: '수입검사관리',
                              thirdPages: [
                                            {
                                              title: '월별 수입검사현황',
                                              component: 'PHA03',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            },
                            {
                              title: '공정/최종검사',
                              thirdPages: [
                                            {
                                              title: '검사 불량현황 발행',
                                              component: 'PHB04',
                                              acc_btn_a : '',
                                              acc_btn_b : '',
                                              acc_btn_c : '',
                                              acc_btn_d : '',
                                              acc_btn_e : ''
                                            }
                                          ]
                            }
                          ]
              }
            ]
  }

}
