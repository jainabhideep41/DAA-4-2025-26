#include <bits/stdc++.h>
using namespace std;

int main()
{
    int N;
    cin >> N;

    vector<char> arr(N);
    for (int i = 0; i < N; i++)
    {
        cin >> arr[i];
    }

    unordered_map<int, int> mp;
    mp[0] = -1;

    int equal_days = 0;
    int MaxLength = 0;

    for (int i = 0; i < N; i++)
    {
        if (arr[i] == 'P')
        {
            equal_days++;
        }
        else
        {
            equal_days--;
        }

        if (mp.count(equal_days))
        {
            MaxLength = max(MaxLength, i - mp[equal_days]);
        }
        else
        {
            mp[equal_days] = i;
        }
    }

    cout << MaxLength << endl;
    return 0;
}
