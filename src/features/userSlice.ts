import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reduxStatus } from "../constants/reduxTypes";
import { HTTP_METHODS } from "../constants/enums";
import axios from "../axios";

const testValue = `aaa
bbb
ccc
ddd
eee
fff
ggg
hhh
iii
jjj
kkk
`;

export const getFileContent = createAsyncThunk(
  "user/getFileContent",
  async ({ url }: { url: string }) => {
    const response = await axios({
      method: HTTP_METHODS.GET,
      url: `/file?url=${url}`
    })
    const fileContent = String(response.data);
    return fileContent;
  });

export const getFilesFromTrees = createAsyncThunk(
  "user/getFilesFromTrees",
  async ({ url, pop }: { url: string, pop?: boolean }) => {
    const response = await axios({
      method: HTTP_METHODS.GET,
      url: `/tree?url=${url}`
    })
    const fetchedFiles = response.data.tree.map((file: any) => {
      return {
        path: file.path,
        url: file.url,
        type: file.type
      }
    });
    const data = {
      files: fetchedFiles,
      URL: response.data.url,
      pop: pop,
    }
    return data;
  });

export const getFilesFromRepository = createAsyncThunk(
  "user/getFilesFromRepository",
  async ({ owner, repo }: { owner: string; repo: string; }) => {
    const response = await axios({
      method: HTTP_METHODS.GET,
      url: `/search/files?owner=${owner}&repo=${repo}`,
    });
    const fetchedFiles = response.data.tree.map((file: any) => {
      return {
        path: file.path,
        url: file.url,
        type: file.type
      }
    });
    const data = {
      files: fetchedFiles,
      URL: [response.data.url],
    }
    return data;
  });


export const addSession = createAsyncThunk(
  "user/addSession",
  async ({ cpm, wpm, errors }: any) => {
    return { cpm, wpm, errors };
  }
);

export const updateError = createAsyncThunk(
  "user/updateError",
  async ({
    currentSessionIndex,
  }: any) => {
    return { currentSessionIndex, };
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    fileContent: testValue,
    fileTree: {
      files: [],
      URLs: [],
      pathname: [],
      pop: false,
    },
    currentError: 0,
    currentSession: 0,
    sessions: [],
    status: reduxStatus.idle,
  },
  reducers: {},
  extraReducers: {
    [addSession.pending as any]: (state, action: any) => {
      state.status = `addSession/${reduxStatus.loading}`;
    },
    [addSession.fulfilled as any]: (state, action: any) => {
      state.currentSession += 1;
      state.sessions = state.sessions.concat(action.payload);
      state.status = `addSession/${reduxStatus.success}`;
    },
    [addSession.rejected as any]: (state, action: any) => {
      state.status = `addSession/${reduxStatus.error}`;
    },

    [getFileContent.pending as any]: (state, action: any) => {
      state.status = `getFileContent/${reduxStatus.loading}`;
    },
    [getFileContent.fulfilled as any]: (state, action: any) => {
      state.fileContent = action.payload;
      state.status = `getFileContent/${reduxStatus.success}`;
    },
    [getFileContent.rejected as any]: (state, action: any) => {
      state.status = `addSession/${reduxStatus.error}`;
    },

    [getFilesFromTrees.pending as any]: (state, action: any) => { },
    [getFilesFromTrees.fulfilled as any]: (state, action: any) => {
      // const URLsLen = state.fileTree.URLs.length;
      if (action.payload.pop)
        state.fileTree.URLs.pop();
      else
        state.fileTree.URLs = state.fileTree.URLs.concat(action.payload.URL);

      console.log("----");
      console.log("a: " + state.fileTree.URLs);
      console.log("b: " + action.payload.URL);
      state.fileTree.files = action.payload.files;
      state.status = `getFilesFromTrees/${reduxStatus.success}`;
    },
    [getFilesFromTrees.rejected as any]: (state, action: any) => { },

    [getFilesFromRepository.pending as any]: (state, action: any) => { },
    [getFilesFromRepository.fulfilled as any]: (state, action: any) => {
      state.fileTree = {
        ...state.fileTree,
        files: action.payload.files,
        URLs: state.fileTree.URLs.concat(action.payload.URL)
      }
      // state.fileTree = state.sessions.concat(action.payload);
      state.status = `getFilesFromRepository/${reduxStatus.success}`;
    },
    [getFilesFromRepository.rejected as any]: (state, action: any) => { },

    [updateError.pending as any]: (state, action: any) => { },
    [updateError.fulfilled as any]: (state, action: any) => { },
    [updateError.rejected as any]: (state, action: any) => { },
  },
});

export const selectUser = (state: any) => {
  return {
    currentSession: state.user.currentSession,
    sessions: state.user.sessions,
  };
};

export const selectUserStatus = (state: any) => {
  return {
    status: String(state.user.status),
  };
};

export const selectFileContent = (state: any) => {
  return {
    fileContent: state.user.fileContent,
  };
};

export const selectFiles = (state: any) => {
  return {
    fileTree: state.user.fileTree
  };
};

export default userSlice.reducer;
