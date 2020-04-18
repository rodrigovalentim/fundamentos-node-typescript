import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

function calcula(transactions: Transaction[], tipo: string): number {
  const valor = transactions.reduce((prevVal, elemento) => {
    return elemento.type === tipo ? prevVal + elemento.value : prevVal;
  }, 0);
  return valor;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = calcula(this.transactions, 'income');
    const outcome = calcula(this.transactions, 'outcome');

    const balance = { income, outcome, total: income - outcome };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
