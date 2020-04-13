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
  const iInfectionsByRequestedTime = iCurrentlyInfected *
        (2 ** Math.floor(data.timeToElapse / 3));
  const sInfectionsByRequestedTime = sCurrentlyInfected *
        (2 ** Math.floor(data.timeToElapse / 3));
  const iSevereCasesbyRequestedTime = Math.trunc(iInfectionsByRequestedTime * 0.15);
  const sSevereCasesbyRequestedTime = Math.trunc(sInfectionsByRequestedTime * 0.15);
  const iHospitalBedsByRequestedTime = Math.trunc(
    (data.totalHospitalBeds * 0.35) - iSevereCasesbyRequestedTime);
  const sHospitalBedsByRequestedTime = Math.trunc(
    (data.totalHospitalBeds * 0.35) - sSevereCasesbyRequestedTime);
  const iCasesForICUByRequestedTime = Math.trunc(iInfectionsByRequestedTime * 0.05);
  const sCasesForICUByRequestedTime = Math.trunc(sInfectionsByRequestedTime * 0.05);
  const iCasesForVentilatorsByRequestedTime = Math.trunc(
    iInfectionsByRequestedTime * 0.02);
  const sCasesForVentilatorsByRequestedTime = Math.trunc(
    sInfectionsByRequestedTime * 0.02);
  const iDollarsInFlight = (iInfectionsByRequestedTime *
                            data.region.avgDailyIncomeInUSD *
                            data.region.avgDailyIncomePopulation * 
                            data.timeToElapse).toFixed(0);
  const sDollarsInFlight = (sInfectionsByRequestedTime *
                            data.region.avgDailyIncomePopulation *
                            data.region.avgDailyIncomeInUSD *
                            data.timeToElapse).toFixed(0);

  const result = {
    impact: {
      currentlyInfected: iCurrentlyInfected,
      infectionsByRequestedTime: iInfectionsByRequestedTime,
      severeCasesbyRequestedTime: iSevereCasesbyRequestedTime,
      hospitalBedsByRequestedTime: iHospitalBedsByRequestedTime,
      casesForICUByequestedTime: iCasesForICUByRequestedTime,
      casesForVentilatorsByequestedTime: iCasesForVentilatorsByRequestedTime,
      dollarsInFlight: iDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: sCurrentlyInfected,
      infectionsByRequestedTime: sInfectionsByRequestedTime,
      severeCasesbyRequestedTime: sSevereCasesbyRequestedTime,
      hospitalBedsByRequestedTime: sHospitalBedsByRequestedTime,
      casesForICUByequestedTime: sCasesForICUByRequestedTime,
      casesForVentilatorsByequestedTime: sCasesForVentilatorsByRequestedTime,
      dollarsInFlight: sDollarsInFlight
    }
  };

  return result;
  // console.log(result);
};

export default covid19ImpactEstimator;
// covid19ImpactEstimator(sampData);
