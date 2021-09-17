const data = [
    {
        question_id: "sum",
        name: "Sum",
        question: "There are two number n and m.\nyou have to take input n and m from user and print sum of those numbers.",
        input: "1. T, Test Cases\n2. next T lines : Two Integer n and m",
        output: "Print n + m",
        tags: "number theory",
        example: [
            {
                input: "5\n1 2\n4 5\n6 7\n232 353\n23 64",
                output: "3\n9\n13\n585\n77"
            }
        ]
    },
    {
        question_id: "num_mirror",
        name: "Number Mirror",
        question: "Problem Statement\nWrite a program that accepts a number, n, and outputs the same.",
        input: "The only line contains a single integer.",
        output: "Output the answer in a single line.",
        tags: "basic io",
        example: [
            {
                input: "\n123\n",
                output: "\n123"
            }
        ]
    }
]

export default data;