import { Sandbox } from "@e2b/code-interpreter";
import dotenv from "dotenv";
dotenv.config();


const TEMPLATE_ID = ""
export async function createSandbox() {
  const sb: Sandbox = await Sandbox.create(TEMPLATE_ID);
  const host = sb.getHost(5173)
  
  const hostUrl = `https://${host}`

  return hostUrl;
}

export async function executeCode(sb: Sandbox, code: string) {
  const execution = await sb.runCode(code);

  console.log(execution.logs);
}

// const sb = await createSandbox();
// const result = await executeCode(
//   sb,
//   `def fibonacci_sequence(n):
//     """
//     Generates a list of Fibonacci numbers up to the nth number.
//     The sequence starts with 0 and 1.

//     Args:
//         n (int): The number of Fibonacci numbers to generate.

//     Returns:
//         list: A list containing the first n Fibonacci numbers.
//               Returns an empty list if n is less than or equal to 0.
//     """
//     if n <= 0:
//         return []
//     elif n == 1:
//         return [0]
//     else:
//         fib_list = [0, 1]
//         while len(fib_list) < n:
//             next_fib = fib_list[-1] + fib_list[-2]
//             fib_list.append(next_fib)
//         return fib_list

// # Example usage:
// # Generate the first 10 Fibonacci numbers
// num_fibs_to_generate = 10
// fib_numbers = fibonacci_sequence(num_fibs_to_generate)
// print(f"The first {num_fibs_to_generate} Fibonacci numbers are: {fib_numbers}")

// # For example, to get the first 5 Fibonacci numbers:
// # num_fibs_to_generate = 5
// # fib_numbers = fibonacci_sequence(num_fibs_to_generate)
// # print(f"The first {num_fibs_to_generate} Fibonacci numbers are: {fib_numbers}")`,
// );

// console.log(result);
