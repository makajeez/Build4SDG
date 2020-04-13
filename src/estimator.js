// const sampData = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 4,
//     avgDailyIncomePopulation: 0.73
//   },
//   periodType: 'days',
//   timeToElapse: 38,
//   reportedCases: 2747,
//   population: 92931687,
//   totalHospitalBeds: 678874
// };

const covid19ImpactEstimator = (data) => {
  const iCurrentlyInfected = data.reportedCases * 10;
  const sCurrentlyInfected = data.reportedCases * 50;
  const iInfectionsByRequestedTime = iCurrentlyInfected * (2 ** Math.floor(data.timeToElapse / 3));
  const sInfectionsByRequestedTime = sCurrentlyInfected * (2 ** Math.floor(data.timeToElapse / 3));

  const result = {
    data,
    impact: {
      currentlyInfected: iCurrentlyInfected,
      infectionsByRequestedTime: iInfectionsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: sCurrentlyInfected,
      infectionsByRequestedTime: sInfectionsByRequestedTime
    }
  };

  return result;
  // console.log(result);
};

export default covid19ImpactEstimator;
// covid19ImpactEstimator(sampData);
