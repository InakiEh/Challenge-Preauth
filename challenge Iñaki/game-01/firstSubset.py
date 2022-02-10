
def firstSubset(numbers, sum):
    reviewedNumbers = []
    for number in numbers:
        if reviewedNumbers.count(sum - number) != 0:
            return [sum - number, number]
        reviewedNumbers.append(number)
    return -1
