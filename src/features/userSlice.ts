import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reduxStatus } from "../constants/reduxTypes";
import { HTTP_METHODS } from "../constants/enums";
import axios from "../axios";

const testValue = `aaaaaaaa
bbbbbbbbbbbbbb
cccccccccccccc
dddddddddddddd
e
f
g
h
i
j
k
`;

export const getFileContent = createAsyncThunk(
  "user/getFileContent",
  async ({ url }: { url: string }) => {
    const response = await axios({
      method: HTTP_METHODS.GET,
      url: `/file?url=${url}`
    })
    // console.log(response);
    const fileContent = String(response.data);
    return fileContent;
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
    return fetchedFiles;
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
    fileEnd: 0,
    files: [],
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
      state.fileEnd = action.payload.length - 1;
      state.status = `getFileContent/${reduxStatus.success}`;
    },
    [getFileContent.rejected as any]: (state, action: any) => {
      state.status = `addSession/${reduxStatus.error}`;
    },

    [getFilesFromRepository.pending as any]: (state, action: any) => { },
    [getFilesFromRepository.fulfilled as any]: (state, action: any) => {
      state.files = state.sessions.concat(action.payload);
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
    fileEnd: state.user.fileEnd
  };
};

export const selectFiles = (state: any) => {
  return {
    files: state.user.files
  };
};

export default userSlice.reducer;
