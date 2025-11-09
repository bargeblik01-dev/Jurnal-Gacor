import BacktestPanel from '@/components/BacktestPanel';
import RiskCalculator from '@/components/RiskCalculator';
export default function Journal(){
  return (
    <div style={{padding:20}}>
      <h2>Journal / Add Trade</h2>
      <RiskCalculator />
      <div style={{height:12}} />
      <BacktestPanel />
    </div>
  )
}
