import sys

result_list = []
return_result = 99
for i in sys.argv[1:]:
    result_list.append(int(i))

for j in result_list:
    if result_list[0] <= 1 and result_list[1] <= 1 and result_list[2] <= 1 and result_list[3] <= 1 and result_list[4] <= 1 and result_list[5] <= 1:
        return_result = 0
    elif result_list[0] > 1 and result_list[1] <= 1 and result_list[2] <= 1 and result_list[3] <= 1 and result_list[4] <= 1 and result_list[5] <= 1:
        return_result = 1
    elif result_list[0] <= 1 and result_list[1] > 1 and result_list[2] <= 1 and result_list[3] <= 1 and result_list[4] <= 1 and result_list[5] <= 1:
        return_result = 2
    elif result_list[0] >= 0 and result_list[1] <= 1 and result_list[2] > 1 and result_list[3] <= 1 and result_list[4] <= 1 and result_list[5] <= 1:
        return_result = 3
    elif result_list[0] >= 0 and result_list[1] > 1 and result_list[2] > 1 and result_list[3] <= 1 and result_list[4] >= 0 and result_list[5] <= 1:
        return_result = 4
    elif result_list[0] >= 0 and result_list[1] >= 0 and result_list[2] <= 1 and result_list[3] > 1 and result_list[4] >= 0 and result_list[5] <= 1:
        return_result = 5
    elif result_list[0] >= 0 and result_list[1] >= 0 and result_list[2] <= 1 and result_list[3] <= 1 and result_list[4] > 1 and result_list[5] <= 1:
        return_result = 6
    elif result_list[0] <= 1 and result_list[1] <= 1 and result_list[2] <= 1 and result_list[3] <= 1 and result_list[4] <= 1 and result_list[5] > 1:
        return_result = 7

print(return_result)
