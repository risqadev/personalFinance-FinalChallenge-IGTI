import React from 'react';
import DisplayField from './DisplayField';
import { formatBRL } from '../helpers/formatter';

export default function DisplayLine({ className, calculations, otherInfos }) {
  return (
    <>
      <div className={className}>
        <DisplayField
          description="Lançamentos"
          value={calculations.count}
          classContainer="_display-field"
          classLabel=""
          classValue="_semi-bold"
        />
        <DisplayField
          description="Receitas"
          value={formatBRL(calculations.income)}
          classContainer="_display-field"
          classLabel=""
          classValue="green-text text-darken-2 _semi-bold"
        />
        <DisplayField
          description="Despesas"
          value={formatBRL(calculations.expenses)}
          classContainer="_display-field"
          classLabel=""
          classValue="red-text text-darken-2 _semi-bold"
        />
        <DisplayField
          description="Saldo"
          value={formatBRL(calculations.balance)}
          classContainer="_display-field"
          classLabel=""
          classValue={[(calculations.balance >= 0 && 'green-text') || 'red-text', 'text-darken-2 _semi-bold'].join(' ')}
        />
      </div>
    </>
  )
}
