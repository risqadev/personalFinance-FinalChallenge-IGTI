import React from 'react';
import DisplayField from './DisplayField';
import { formatBRL } from '../helpers/formatter';

export default function DisplayLine({ calculations, otherInfos }) {
  return (
    <>
      <div className="row">
        <DisplayField description="Lançamentos" value={calculations.count} />
        <DisplayField description="Receitas" value={formatBRL(calculations.income)} />
        <DisplayField description="Despesas" value={formatBRL(calculations.expenses)} />
        <DisplayField description="Saldo" value={formatBRL(calculations.balance)} />
      </div>
      <p>{otherInfos}</p>
    </>
  )
}
