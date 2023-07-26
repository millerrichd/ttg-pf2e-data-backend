const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./treasure.service");

/*
  TREASURE CHART
  level 1: perm:  2:2,  1:2. cons:  2:2,  1:3
        2: perm:  3:2,  2:2. cons:  3:2,  2:2,  1:2
        3: perm:  4:2,  3:2. cons:  4:2,  3:2,  2:2
        4: perm:  5:2,  4:2. cons:  5:2,  4:2,  3:2
        5: perm:  6:2,  5:2. cons:  6:2,  5:2,  4:2
        6: perm:  7:2,  6:2. cons:  7:2,  6:2,  5:2
        7: perm:  8:2,  7:2. cons:  8:2,  7:2,  6:2
        8: perm:  9:2,  8:2. cons:  9:2,  8:2,  7:2
        9: perm: 10:2,  9:2. cons: 10:2,  9:2,  8:2
       10: perm: 11:2, 10:2. cons: 11:2, 10:2,  9:2
       11: perm: 12:2, 11:2. cons: 12:2, 11:2, 10:2
       12: perm: 13:2, 12:2. cons: 13:2, 12:2, 11:2
       13: perm: 14:2, 13:2. cons: 14:2, 13:2, 12:2
       14: perm: 15:2, 14:2. cons: 15:2, 14:2, 13:2
       15: perm: 16:2, 15:2. cons: 16:2, 15:2, 14:2
       16: perm: 17:2, 16:2. cons: 17:2, 16:2, 15:2
       17: perm: 18:2, 17:2. cons: 18:2, 17:2, 16:2
       18: perm: 19:2, 18:2. cons: 19:2, 18:2, 17:2
       19: perm: 20:2, 19:2. cons: 20:2, 19:2, 18:2
       20: perm: 20:4.       cons: 20:4, 19:2
  MAX:     perm: 80          cons: 119
*/

async function list(req, res, next) {
  /* 
    need the following queries passed in
    sett(lement_level): 4
    char(acter_level): 2 [optional]
    sele(ction): perm:cons:both

    formula
    I want all items up to settlement_level,
    not including anything 3 under character_level
    not including anything 2 over the character level
    so a settlement_level of 4 and character_level of 2 should get me levels 1, 2, & 3
    so a settlement_level of 4 and a character_level of 6 should get me levels 4
    so a settlement_level of 20 and character_level of 12 should get me levels 10, 11, 12, 13

    selected levels = (char-2, char-1, char, char+1) where char* <= sett and char* is > 0

    randomly select 4 of each level regardless of what the chart says?
  */

  // get the min and max levels
  const character_level = Number(req.query.char);
  const settlement_level = Number(req.query.sett);
  const selection = req.query.sele;

  let min_level = 1;
  let max_level = 20;
  //min
  if(character_level - 3 >= 1) {
    min_level = character_level - 3;
  } else if(character_level - 2 >= 1) {
    min_level = character_level - 2;
  } else if(character_level - 1 >= 1) {
    min_level = character_level - 1;
  } else {
    min_level = character_level;
  }
  //max
  if(settlement_level < character_level + 1) {
    max_level = settlement_level;
  } else {
    if(character_level + 1 > 20) {
      max_level = 20;
    } else { 
      max_level = character_level + 1;
    }
  }
  //make sure max is not less than min, otherwise make them equal to max
  if(max_level < min_level) {
    min_level = max_level
  }

  console.log("CHAR LVL", character_level, "MIN", min_level, "MAX", max_level);

  let data = []
  if(selection === "both") {
    data = await service.list(min_level, max_level);
  } else if(selection === "perm") {
    data = await service.list_perm_only(min_level, max_level);
  } else {
    data = await service.list_consume_only(min_level, max_level);
  }
  

  //break down the data into subsets by level
  const subsets = {};
  data.forEach(entry => {
    const tempLevel = "level" + entry.level
    if(Object.keys(subsets).includes(tempLevel)) {
      subsets[tempLevel].push(entry);
    } else {
      subsets[tempLevel] = [];
      subsets[tempLevel].push(entry);
    }
  });

  //get the random results
  const randomData = [];
  const numberOfLevels = Object.keys(subsets).length;
  Object.keys(subsets).forEach(entry => {
    const len = subsets[entry].length;
    if(len <= 4) {
      for(let i=0; i<len; i++) {
        randomData.push(subsets[entry][i])
      }
    } else {
      const memory = []
      for(let i=0; i<4; i++) {
        const randNum = Math.floor(Math.random() * len);
        if(memory.includes(randNum)) {
          i--;
        } else {
          randomData.push(subsets[entry][randNum])
        }
      }
    }
  })

  res.status(200).json({randomData});
}

module.exports = {
  list: [asyncErrorBoundary(list)]
}