class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        long long sum = 0;
        for(long long i : piles) sum += i;
        long long n = piles.size();
        sort(piles.begin(),piles.end());
        long long left = 1;
        long long right = piles[n-1];
        long long ans = right + 1;
        while(left <= right)
        {
            long long mid = left + (right - left) / 2;
            if(valid(piles,h,mid))
            {
                ans = min(ans,mid);
                right = mid - 1;
            }
            else
            {
                left = mid + 1;
            }
        }
        return ans;
    }
    bool valid(vector<int>& piles, int h, int target)
    {
        long long count = 0;
        for(long long i : piles)
        {   
            count += i / target;
            if(i % target != 0) count++;
        }
        if(count <= h) return true;
        else return false;
    }
    
};
