class Solution {
  public:
    int aggressiveCows(vector<int> &stalls, int k) {
        // code here
        int n = stalls.size();
        int ans = 0;
        sort(stalls.begin(), stalls.end());
        int left = 1;
        int right = stalls[n-1];
        while(left <= right){
            int mid = left + (right - left) / 2;
            if(helper(stalls,mid,k,n)){
                ans = mid;
                left = mid + 1;
            } 
            else right = mid - 1;  
        }
        return ans;
    }
    bool helper(vector<int> &stalls, int num, int k, int n){
        int count = k - 1;
        int temp = stalls[0];
        for(int i = 1; i<n; i++){
            if(stalls[i] >= temp + num){
                temp = stalls[i];
                count--;
            }
            if(count == 0) return true;
        }
        if(count == 0) return true;
        else return false;
    }
};
