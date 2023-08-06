const JOBS = {
  "pld":{},
  "war":{},
  "drk":{},
  "gnb":{},
  "whm":{},
  "ast":{},
  "sch":{},
  "sge":{},
  "drg":{},
  "mnk":{},
  "nin":{},
  "sam":{},
  "blm":{},
  "smn":{},
  "rdm":{},
  "brd":{},
  "mch":{},
  "dnc":{}
}

const test_cases = {
  'sentinel': {
    'mits': [{
      'amount': {
        'magic': .15,
        'physical': .15
      },
      'duration': 15,
    }],
    'recast': 120,
  },
  'bulwark': {
    'mits': [{
      'amount': {
        'magic': 0,
        'physical': .15
      },
      'duration': 10,
    }],
    'recast': 90,
  },
  'divine veil': {
    'shields': [{
      'type': 'percent',
      'target': 'all',
      'scaling': {'hp': 'caster'},
      'duration': 30
    },{
    'heals': [{
      'potency': 400,
      'target': 'all',
    }]

    }],
    'recast': 90,
    'type': 'ability'
  },
  'intervention': {
    'mits': [{
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 8,
      'buffedBy': [{
        'rampart': {'amount': .1},
        'sentinel': {'amount': .1} // XOR
      },
      ],
      'target': 'anyButSelf'
    }, {
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 4,
      'target': 'anyButSelf'
    }],
    'heals': [{
      'potency': 250,
      'duration': 12,
      'target': 'anyButSelf'
    }],
    'recast': 10,
  },
  'passage of arms': {
    'mits':[{
      'amount': {
        'physical': .15
      },
      'duration': 0,
    },{
      'amount': {
        'magic': .15,
        'physical': .15
      },
      'duration': 3, //channelDuration + 3
      'target': 'allButSelf'

    }],
    'recast': 120,
    'channelDuration': 0
  },
  'reprisal': {
    'mits': [{
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 10,
      'isDebuff': true
    }],
    'recast': 60,
  },
  'living dead': {
    'isTankInvuln': true,
    'recast': 300
  },
  'oblation': {
    'mits': [{
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 10,
      'target': 'single',
    }],
    'recast': 60,
    'stacks': 2
  },
  'thrill of battle': {
    'heals': [{
      'buff': 'thrill of battle',
      'isIncreaseMaxHP': true,
      'percentage': .2,
      'duration': 10
    }],
    'recast': 90,
    'isIncomingHealsBuff': true
  },
  'shake it off': {
    'shields': [{
      'duration': 30,
      'target': 'all',
      'scaling': {'hp': 'self'},
      'buffedBy': [{
        'thrill of battle': {   // AND
          'amount': .02,
          'isConsumed': true
        }
      }, {
        'vengeance': {
          'amount': .02,
          'isConsumed': true
        }
      }, {
        'bloodwhetting': {
          'amount': .02,
          'isConsumed': true
        }
      }]
    }],
    'heals': [{
      'potency': 100,
      'duration': 15,
      'target': 'all'
    }, {
      'potency': 300,
      'target': 'single'
    }],
    'recast': 90
  },
  'bloodwhetting': {
    'mits': [{
      'buff': 'bloodwhetting',
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 8
    }, {
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 4
    }],
    'shields': [{
      'duration': 20,
      'scaling': {'potency': 400}
    }],
    'heals': [{
      'buff': 'bloodwhetting',
      'potency': 400,
      'duration': 8
    }],
    'recast': 25,
    'sharesRecastTimerWith': ['nascent flash']
  },
  'tactition': {
    'mits': [{
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 15,
      'target': 'all',
    }],
    'recast': 90,
    'noStackWith': ['shield samba', 'troubadour']
  },
  'shield samba': {
    'mits': [{
      'amount': {
        'magic': .1,
        'physical': .1
      },
      'duration': 15,
      'target': 'all',
    }],
    'recast': 90,
    'noStackWith': ['tactition', 'troubadour']
  },
  'asylum': {
    'heals': [{
      'potency': 100,
      'duration': 24,
      'target': 'all'
    }],
    'recast': 90,
    'isIncomingHealsBuff': true
  },
  'heart of corundrum': {
    'mits': [{
      'amount': {
        'magic': .15,
        'physical': .15
      },
      'duration': 8,
      'target': 'single'
    }, {
      'amount': {
        'magic': .15,
        'physical': .15
      },
      'duration': 4,
      'target': 'single',
    }],
    'heals': [{
      'hasHpTrigger': .5,
      'potency': 900,
      'duration': 20,
      'target': 'single'
    }],
    'shields': [{
      // BRUTAL SHELL???? Do we include it or not
    }],
    'recast': 25
  },
  'benediction': {
    'heals': [{
      'percentage': 1,
      'target': 'single'
    }],
    'recast': 180
  },
  'adloquium': {},
  'zoe': {},
  'eukrasian diagnosis': {},
  'pepsis': {},
  'haima': {},
  'improvisation': {},
  'liturgy of the bell': {},
  'recitation': {},
  'excogitation': {},
  'macrocosmos': {}, // i really think this needs its own special case







}

