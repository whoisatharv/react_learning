#include <iostream>
#include <stack>
#include <vector>
using namespace std;

int largestRectangleArea(vector<int>& heights) {
    int n = heights.size();
    stack<int> st;
    int leftSmall[n], rightSmall[n];
    
    // Calculate leftSmall
    for (int i = 0; i < n; i++) {
        while (!st.empty() && heights[st.top()] >= heights[i]) {
            st.pop();
        }
        if (st.empty()) 
            leftSmall[i] = 0; // No smaller element on the left
        else 
            leftSmall[i] = st.top() + 1; // Index after the smaller element
        st.push(i);
    }

    // Clear the stack to reuse for rightSmall
    while (!st.empty()) st.pop();

    // Calculate rightSmall
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && heights[st.top()] >= heights[i]) {
            st.pop();
        }
        if (st.empty()) 
            rightSmall[i] = n - 1; // No smaller element on the right
        else 
            rightSmall[i] = st.top() - 1; // Index before the smaller element
        st.push(i);
    }

    // Calculate the maximum area
    int maxA = 0;
    for (int i = 0; i < n; i++) {
        maxA = max(maxA, heights[i] * (rightSmall[i] - leftSmall[i] + 1));
    }
    return maxA;
}

int main() {
    vector<int> heights = {2, 1, 5, 6, 2, 3, 1};
    cout << "The largest area in the histogram is " << largestRectangleArea(heights);
    return 0;
}
