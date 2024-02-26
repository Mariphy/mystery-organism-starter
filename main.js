// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const listOfSpecimenIds = []

const pAequorFactory = (specimenNum, dna) => { 
  if (listOfSpecimenIds.includes(specimenNum)) {
    console.log('Error: Specimen number must be unique.');
    return null; 
  }
  listOfSpecimenIds.push(specimenNum);
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate: function() {
      let randomNumber = Math.floor(Math.random()*15)
      let newBase = returnRandBase();
      if (dna[randomNumber] !== newBase) {
         dna[randomNumber] = newBase;
         return this.dna;
      } else do {
        newBase = returnRandBase();
           if (dna[randomNumber] !== newBase) {
             dna[randomNumber] = newBase;
             return this.dna;
           }
      } while (dna[randomNumber] === newBase);
    },
    compareDNA: function(pAequor) {
      let matchedBases = 0;
      for (let i = 0; i < 14; i++) {
        //console.log(dna[i], pAequor.dna[i])
        if (dna[i] === pAequor.dna[i]) {
          matchedBases = matchedBases +1;
          //console.log(matchedBases);  
        };
      }  
      let matchedPercentage = 100/15 *matchedBases;
      //console.log(matchedPercentage)
      console.log( `Specimen #${specimenNum} and specimen #${pAequor.specimenNum} have ${Math.floor(matchedPercentage)}% DNA in common.`)
    },
    willLikelySurvive: function() {
      let goodDnaCount = 0;
      for (let i = 0; i < 14; i++) {
        if (dna[i] === 'C' || dna[i] === 'G') {
          goodDnaCount = goodDnaCount + 1;
        }
      }
      let survivalChance = 100/15 * goodDnaCount;
      if (survivalChance >= 60) {
        return true;
      } else {
        return false;
      }
    },
  }
}; 

//const pAequor1 = pAequorFactory(1, mockUpStrand());
//const pAequor2 = pAequorFactory(2, mockUpStrand());
//console.log(pAequor1);
//console.log(pAequor1.mutate());
//console.log(pAequor2);
//console.log(pAequor1.compareDNA(pAequor2));
//console.log(pAequor1.willLikelySurvive())

let pAequorsArray = [];
const createNewPAequors = () => {
  for (let i = 1; i <= 1000; i++) {
    let newPAequor = pAequorFactory(i, mockUpStrand());
    //console.log(newPAequor);
    if (newPAequor.willLikelySurvive() === true) {
      pAequorsArray.push(newPAequor);
    
      if (pAequorsArray.length === 30) {
        break;
      }  
    }  
  }
};

createNewPAequors();
console.log(pAequorsArray.length)








