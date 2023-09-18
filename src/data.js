const JOBS = {
  "pld":[],
  "war":[],
  "drk":['nascent flash'],
  "gnb":[],
  "whm":[],
  "ast":[],
  "sch":[],
  "sge":[],
  "drg":[],
  "mnk":[],
  "nin":[],
  "sam":[],
  "rpr":[],
  "blm":[],
  "smn":[],
  "rdm":[],
  "brd":[],
  "mch":[],
  "dnc":[]
}

const test_cases = {
  'sentinel': {
    'mits': [{
      'amount': {
        'magic': .15,
        'physical': .15
      },
      'duration': 2,
    }],
    'recast': 4,
    'duration': 2,   //NEW
    'target': 'self' //NEW
  },
  'bulwark': {
    'mits': [{
      'amount': {
        'magic': 0,
        'physical': .15
      },
      'duration': 1,
    }],
    'recast': 2,
    'duration': 1,    //NEW
    'target': 'self'  //NEW
  },
  // 'divine veil': {
  //   'shields': [{
  //     'target': 'all',
  //     'scaling': {'casterHp': .1},
  //     'duration': 30
  //   }],
  //   'heals': [{
  //     'potency': 400,
  //     'target': 'all',
  //   }],
  //   'recast': 90,
  // },
  // 'intervention': {
  //   'mits': [{
  //     'amount': {
  //       'magic': .1,
  //       'physical': .1
  //     },
  //     'duration': 8,
  //     'target': 'ally'
  //   }, {
  //     'amount': {
  //       'magic': .1,
  //       'physical': .1
  //     },
  //     'duration': 4,
  //     'target': 'ally'
  //   }],
  //   'heals': [{
  //     'potency': 250,
  //     'duration': 12,
  //     'target': 'ally'
  //   }],
  //   'recast': 10,
  //   'buffedBy': [{
  //     'rampart': {
  //       'mits': [{
  //         'amount': {
  //           'magic': .1,
  //           'physical': .1},
  //         'duration': 8,
  //         'target': 'ally'}]},
  //     'sentinel': {
  //       'mits': [{
  //         'amount': {
  //           'magic': .1,
  //           'physical': .1},
  //         'duration': 8,
  //         'target': 'ally'}]} 
  //   },],
  // },
  // 'passage of arms': {
  //   'mits':[{
  //     'amount': {
  //       'physical': .15
  //     },
  //     'duration': 0,
  //   },{
  //     'amount': {
  //       'magic': .15,
  //       'physical': .15
  //     },
  //     'duration': 3, //channelDuration + 3
  //     'target': 'allies'

  //   }],
  //   'recast': 120,
  //   'channel': {
  //     'channelDuration': 0
  //   }
  // },
  // 'reprisal': {
  //   'mits': [{
  //     'amount': {
  //       'magic': .1,
  //       'physical': .1
  //     },
  //     'duration': 10,
  //     'isDebuff': true
  //   }],
  //   'recast': 60,
  // },
  // 'living dead': {
  //   'isTankInvuln': true,
  //   'recast': 300
  // },
  'oblation': {
    'mits': [{
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 3,
      'target': 'single',
    }],
    'recast': 3,
    'stacks': 2,
    'duration': 3,      //NEW
    'target': 'single'  //NEW
  },
  // 'thrill of battle': {
  //   'heals': [{
  //     'buff': 'thrill of battle',
  //     'isIncreaseMaxHP': true,
  //     'percentage': .2,
  //     'duration': 10
  //   }],
  //   'recast': 90,
  //   'isIncomingHealsBuff': true
  // },
  // 'shake it off': {
  //   'shields': [{
  //     'duration': 30,
  //     'target': 'all',
  //     'scaling': {'selfhP': .15}
  //   }],
  //   'heals': [{
  //     'potency': 100,
  //     'duration': 15,
  //     'target': 'all'
  //   }, {
  //     'potency': 300,
  //     'target': 'single'
  //   }],
  //   'recast': 90,
  //   'buffedBy': [{
  //     'thrill of battle': {   // AND
  //       'shields': [{
  //         'duration': 30,
  //         'target': 'all',
  //         'scaling': {'amount': .02}}],
  //       'isConsumed': true
  //     }
  //   }, {
  //     'vengeance': {
  //       'shields': [{
  //         'duration': 30,
  //         'target': 'all',
  //         'scaling': {'amount': .02}}],
  //       'isConsumed': true
  //     }
  //   }, {
  //     'bloodwhetting': {
  //       'shields': [{
  //         'duration': 30,
  //         'target': 'all',
  //         'scaling': {'amount': .02}}],
  //       'isConsumed': true
  //     }
  //   }]
  // },
  // 'bloodwhetting': {
  //   'mits': [{
  //     'buff': 'bloodwhetting',
  //     'amount': {
  //       'magic': .1,
  //       'physical': .1
  //     },
  //     'duration': 8
  //   }, {
  //     'amount': {
  //       'magic': .1,
  //       'physical': .1
  //     },
  //     'duration': 4
  //   }],
  //   'shields': [{
  //     'duration': 20,
  //     'scaling': {'potency': 400}
  //   }],
  //   'heals': [{
  //     'buff': 'bloodwhetting',
  //     'potency': 400,
  //     'duration': 8
  //   }],
  //   'recast': 25,
  //   'sharesRecastTimerWith': ['nascent flash']
  // },
  'nascent flash': {
    'mits': [{
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 8,
      'target': 'ally'
    }, {
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 4,
      'target': 'ally'
    }],
    'shields': [{
      'duration': 20,
      'target': 'ally',
      'scaling': {'potency': 400}
    }],
    'heals': [{
      'potency': 400,
      'duration': 8,
      'target': 'partner'
    }],
    'recast': 25,
    'sharesRecastTimerWith': ['bloodwhetting'],
    'duration': 8,
    'target': 'ally'
  },
  // 'tactition': {
  //   'mits': [{
  //     'amount': {
  //       'magic': .1,
  //       'physical': .1
  //     },
  //     'duration': 15,
  //     'target': 'all',
  //     'noStackWith': ['shield samba', 'troubadour']
  //   }],
  //   'recast': 90
  // },
  // 'shield samba': {
  //   'mits': [{
  //     'amount': {
  //       'magic': .1,
  //       'physical': .1
  //     },
  //     'duration': 15,
  //     'target': 'all',
  //     'noStackWith': ['tactition', 'troubadour']
  //   }],
  //   'recast': 90
  // },
  // 'asylum': {
  //   'heals': [{
  //     'potency': 100,
  //     'duration': 24,
  //     'target': 'all'
  //   }],
  //   'recast': 90,
  //   'isIncomingHealsBuff': true,
  // },
  // 'heart of corundrum': {
  //   'mits': [{
  //     'amount': {
  //       'magic': .15,
  //       'physical': .15
  //     },
  //     'duration': 8,
  //     'target': 'single'
  //   }, {
  //     'amount': {
  //       'magic': .15,
  //       'physical': .15
  //     },
  //     'duration': 4,
  //     'target': 'single',
  //   }],
  //   'heals': [{
  //     'hasHpTrigger': .5,
  //     'potency': 900,
  //     'duration': 20,
  //     'target': 'single'
  //   }],
  //   'shields': [{
  //     // BRUTAL SHELL???? Do we include it or not
  //   }],
  //   'recast': 25
  // },
  // 'benediction': {
  //   'heals': [{
  //     'percentage': 1,
  //     'target': 'single'
  //   }],
  //   'recast': 180
  // },
  // 'adloquium': {
  //   'heals': [{
  //     'potency': 300,
  //     'target': 'single',
  //   }],
  //   'shields':[{
  //     'buff': 'galvanize', //SUCCOR'S BUFF IS ALSO GALVANIZE
  //     'scaling': {'healed': 1.8},
  //     'duration': 30,
  //     'target': 'single',
  //     'noStackWith': ['eukrasian diagnosis', 'eukrasian prognosis']
  //   }],
  //   'recast': 2.5,  //will be rounding up to 3
  //   'castDuration': 2,
  //   'isGcd': true,
  //   'buffedBy': [{
  //     'recitation': {
  //       'heals':[{
  //         'potency': '?????', //CRIT SCALING
  //         'target': 'single'
  //       }],
  //       'shields':[{
  //         'buff': 'catalyze',
  //         'duration': 30,
  //         'target': 'single'
  //       }],
  //       'isConsumed': true
  //     }},
  //     {
  //     'deployment tactics': {
  //       'shields':[{
  //         'buff': 'galvanize', // SUCCOR BUFF IS ALSO GALVANIZE
  //         'scaling': {'healed': 1.8},
  //         'duration': 30,   // SHOULD BE THE DURATION OF SOURCE GALVANIZE
  //         'target': 'all',
  //         'noStackWith': ['eukrasian diagnosis', 'eukrasian prognosis']
  //       }],
  //       'isConsumed': true
  //     }}]
  // },
  // 'recitation': {   //adlo, succor, indomitability, excogitation
  //   'isHealBuff': true,
  //   'recast': 90,
  //   'duration': 15
  // },
  // 'zoe': {    // all sage gcd heals
  //   'isHealBuff': true,
  //   'recast': 90,
  //   'duration': 30
  // },
  // 'eukrasian diagnosis': {
  //   'heals':[{
  //     'potency': 300,
  //     'target': 'single',
  //   }],
  //   'shields':[{
  //     'scaling': {'healed': 1.8},
  //     'duration': 30,
  //     'target': 'single',
  //     'noStackWith': ['adloquium', 'eukrasian prognosis']
  //   }],
  //   'recast': 1.5, //rounded up to 2
  //   'isGcd': true,
  //   'buffedBy': [{
  //     'zoe': {
  //       'heals':[{
  //         'potency': 150,
  //         'target': 'single'
  //     }],
  //       'shields':[{
  //         'scaling': {'healed': 1.8},
  //         'duration': 30,
  //         'target': 'single',
  //         'noStackWith': ['adloquium', 'eukrasian prognosis'] 
  //     }],
  //     'isConsumed': true
  //     }
  //   }]
  // },
  // 'improvisation': {
  //   'heals': [{
  //     'potency': 100,
  //     'duration': 15,
  //     'target': 'all'
  //   }],
  //   'recast': 120,
  //   'channel': {
  //     'channelDuration': 0,
  //     'interval': 3,
  //     'effects': {
  //       3: {
  //         'shields': [{
  //           'duration': 30,
  //           'target': 'all',
  //           'scaling': {'selfHp': .06}
  //         }]
  //       },
  //       6: {
  //         'shields': [{
  //           'duration': 30,
  //           'target': 'all',
  //           'scaling': {'selfHp': .07}
  //         }]
  //       },
  //       9: {
  //         'shields': [{
  //           'duration': 30,
  //           'target': 'all',
  //           'scaling': {'selfHp': .08}
  //         }]
  //       },
  //       12: {
  //         'shields': [{
  //           'duration': 30,
  //           'target': 'all',
  //           'scaling': {'selfHp': .1}
  //         }]
  //       }
  //     }
  //   }
  // },
  // 'haima': {
  //   'shields': [{
  //     'duration': 15,
  //     'target': 'single',
  //     'scaling': {'potency': 300}
  //   }], 
  //   'recast': 120,
  //   'stackTrigger': 'shieldBreak',
  //   'unusedStackEffect': {
  //     'heals': [{
  //       'potency': 150,
  //       'target': 'single'
  //     }]
  //   }
  // },
  // 'liturgy of the bell': {
  //   'heals': [{
  //     'potency': 400,
  //     'duration': 20,
  //     'target': 'all'
  //   }],
  //   'recast': 180,
  //   'stackTrigger': 'hpLoss',
  //   'unusedStackEffect': {
  //     'heals': [{
  //       'potency': 200,
  //       'target': 'all'
  //     }]
  //   }

  // },
  // 'macrocosmos': {
  //   'heals':[{
  //     'potency': 200,
  //     'target': 'all'
  //   }],
  //   'recast': 180,
  //   'isFuckingMacrocosmos': true
  // }
}

export {test_cases, JOBS}